import React,  { useContext, useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

import ordenesCompraContext from '../../Context/ordenesCompra/ordenescompraContext';
import alertaContext from '../../Context/alertas/alertaContext';

export default function OrdenesCompras(){
    
    const OrdenesCompraContext = useContext(ordenesCompraContext);
    const { ordenescompras, obtenerOrdenesCompras, eliminarOrdenCompra } = OrdenesCompraContext;

    const AlertaContext = useContext(alertaContext);
    const {alerta, mostrarAlerta} = AlertaContext;
    
    let confirm;
    const [loop,] = useState(0);
    const [consulta, setConsulta] = useState('');
    const [filterOrdenCompra, setFilterOrdenCompra] = useState(ordenescompras);

    /*eslint-disable*/
    useEffect(()=>{
        obtenerOrdenesCompras();
    }, [loop]);
    /*eslint-enable*/

    useMemo(()=>{
        const result = ordenescompras.filter(ordencompra=>{
            return `${ordencompra.codePurchaseOrder}`
                    .toLowerCase()
                    .includes(consulta.toLowerCase())
        })
        setFilterOrdenCompra(result);
    },[consulta, ordenescompras])

    const onClickEliminar = ordencompra => {
        confirm = window.confirm('¿Estas seguro de eliminarlo?');
        
        if(confirm){
            eliminarOrdenCompra(ordencompra);
            mostrarAlerta('Orden de compra eliminada exitosamente!', 'alert-success');
            obtenerOrdenesCompras();
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
                                        placeholder="Buscar Bodega..."
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
                                    <h4 className="card-title">Ordenes de Compras( {ordenescompras.length} )</h4>
                                </div>
                                <div className="col-4 mb-2">
                                    <div className="text-right">
                                        <Link className="btn btn-sm btn-primary" to='/admin/ordenescompras/nueva'>
                                            <span className="pcoded-micon"><i className="ti-user"></i></span>
                                            <span className="pcoded-mtext p-2">Agregar</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>COD. Orden Compra</th>
                                            <th>Estado</th>
                                            <th>Tipo de pago</th>
                                            <th>Tipo</th>
                                            <th>Costo</th>
                                            <th>Total</th>
                                            <th className="w100 text-nowrap">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filterOrdenCompra.length === 0
                                            ?
                                            <tr><div className="alert alert-danger">No hay ordenes de compras</div></tr>
                                            :
                                            (
                                                filterOrdenCompra.map(ordencompra => {
                                                    return(
                                                    <tr key={ordencompra._id}>  
                                                        <td>{ordencompra.codePurchaseOrder}</td>
                                                        <td>{ordencompra.status}</td>
                                                        <td>{ordencompra.typeShip}</td>
                                                        <td>{ordencompra.costShip}</td>
                                                        <td>{ordencompra.total}</td>
                                                        <td className="text-nowrap text-center">
                                                            <button
                                                                data-toggle="tooltip" 
                                                                className="btn btn-sm btn-danger"
                                                                data-original-title="Borrar"
                                                                onClick={()=>onClickEliminar(ordencompra)}
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