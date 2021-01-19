import React,  { useContext, useEffect, useState, useMemo } from 'react';
import { Link, useHistory } from 'react-router-dom';

import compraContext from '../../Context/compras/compraContext';
import alertaContext from '../../Context/alertas/alertaContext';

export default function Compras(){
    const history = useHistory();

    const CompraContext = useContext(compraContext);
    const { compras, obtenerCompras, guardarCompraActual, eliminarCompra } = CompraContext;

    const AlertaContext = useContext(alertaContext);
    const { alerta, mostrarAlerta } = AlertaContext;
    
    let confirm;
    const [loop,] = useState(0);
    const [consulta, setConsulta] = useState('');
    const [filterCompras, setFilterCompras] = useState(compras);

    /*eslint-disable*/
    useEffect(()=>{
        obtenerCompras();
    }, [loop]);
    /*eslint-enable*/

    useMemo(()=>{
        /*${compra.warehouseId}*/
        const result = compras.filter(compra=>{
            return `${compra.codePurchase}`
                    .toLowerCase()
                    .includes(consulta.toLowerCase())
        })
        setFilterCompras(result);
    },[consulta, compras])

    const seleccionarCompra = compra => {
        guardarCompraActual(compra);
        history.push('compras/nueva');
    }

    const onClickEliminar = compra => {
        confirm = window.confirm('¿Estas seguro de eliminarla?');
        
        if(confirm){
            eliminarCompra(compra);
            mostrarAlerta('Compra eliminado exitosamente!', 'alert-success');
            obtenerCompras();
            return;
        }       
    }

    return(
        <>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            {alerta ?
                            (
                                <div className={`alert ${alerta.tipoAlerta}`}>
                                    {alerta.msg}
                                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">X</span>
                                    </button>
                                </div>
                            )
                            : 
                            (    <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"><i className="ti-search"></i></div>
                                    </div>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        placeholder="Buscar Compra..."
                                        name="consulta"
                                        value={consulta}
                                        onChange={e=> setConsulta(e.target.value)}
                                    />
                                </div>
                            )
                            }

                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-8">
                                    <h4 className="card-title">Compras( {compras.length} )</h4>
                                </div>
                                <div className="col-4 mb-2">
                                    <div className="text-right">
                                        <Link className="btn btn-sm btn-primary" to='/admin/compras/nueva'>
                                            <span className="pcoded-micon"><i className="ti-plus"></i></span>
                                            <span className="pcoded-mtext p-2">Agregar</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>COD. Compra</th>
                                            <th>Fecha de Compra</th>
                                            <th>Estado</th>
                                            <th>Tipo de Pago</th>
                                            <th>Nombre Bodega</th>
                                            <th>Balance</th>
                                            <th className="w100 text-nowrap">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filterCompras.length === 0
                                            ?
                                            <tr><div className="alert alert-danger">No hay compras</div></tr>
                                            :
                                            (
                                                filterCompras.map(compra => {
                                                    return(
                                                    <tr key={compra._id}>  
                                                        <td>{compra.codePurchase}</td>
                                                        <td>{ new Date(compra.datePurchase).toLocaleDateString()}</td>
                                                        <td>{compra.statusPurchase}</td>
                                                        <td>{compra.typePaid}</td>
                                                        <td>{compra.warehouseId}</td>
                                                        <td>{compra.Balance}</td>
                                                        <td className="text-nowrap text-center">
                                                            <button
                                                                data-toggle="tooltip" 
                                                                className="btn btn-sm btn-warning"
                                                                data-original-title="Editar"
                                                                onClick={()=> seleccionarCompra(compra)}
                                                            ><i className="ti-pencil"></i></button>
                                                            <button
                                                                data-toggle="tooltip" 
                                                                className="btn btn-sm btn-danger"
                                                                data-original-title="Borrar"
                                                                onClick={()=>onClickEliminar(compra)}
                                                            ><i className="ti-trash"></i></button>
                                                        </td>
                                                    </tr> 
                                                    )
                                                })
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

    
}