import React,  { useContext, useEffect, useState, useMemo } from 'react';
import { Link, useHistory } from 'react-router-dom';

import bodegaContext from '../../Context/bodegas/bodegaContext';
import alertaContext from '../../Context/alertas/alertaContext';

export default function Bodegas(){
    const history = useHistory();

    const BodegaContext = useContext(bodegaContext);
    const { bodegas, obtenerBodegas, guardarBodegaActual, eliminarBodega } = BodegaContext;

    const AlertaContext = useContext(alertaContext);
    const {alerta, mostrarAlerta} = AlertaContext;
    
    let confirm;
    const [loop,] = useState(0);
    const [consulta, setConsulta] = useState('');
    const [filterBodegas, setFilterBodegas] = useState(bodegas);

    /*eslint-disable*/
    useEffect(()=>{
        obtenerBodegas();
    }, [loop]);
    /*eslint-enable*/

    useMemo(()=>{
        const result = bodegas.filter(bodega=>{
            return `${bodega.warehouseName}`
                    .toLowerCase()
                    .includes(consulta.toLowerCase())
        })
        setFilterBodegas(result);
    },[consulta, bodegas])

    const seleccionarBodega = bodega => {
        guardarBodegaActual(bodega);
        history.push('bodegas/nueva');
    }

    const onClickEliminar = bodega => {
        confirm = window.confirm('¿Estas seguro de eliminarlo?');
        
        if(confirm){
            eliminarBodega(bodega);
            mostrarAlerta('Bodega eliminado exitosamente!', 'alert-success');
            obtenerBodegas();
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
                                    <h4 className="card-title">Bodegas( {bodegas.length} )</h4>
                                </div>
                                <div className="col-4 mb-2">
                                    <div className="text-right">
                                        <Link className="btn btn-sm btn-primary" to='/admin/bodegas/nueva'>
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
                                            <th>COD. Bodega</th>
                                            <th>Nombre Bodega</th>
                                            <th>Telefono</th>
                                            <th>Detalles</th>
                                            <th>Ubicacion</th>
                                            <th className="w100 text-nowrap">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filterBodegas.length === 0
                                            ?
                                            <tr><div className="alert alert-danger">No hay bodegas</div></tr>
                                            :
                                            (
                                                filterBodegas.map(bodega => {
                                                    return(
                                                    <tr key={bodega._id}>  
                                                        <td>{bodega.codeWarehouse}</td>
                                                        <td>{bodega.warehouseName}</td>
                                                        <td>{bodega.warehousePhone1}</td>
                                                        <td>{bodega.details}</td>
                                                        <td>{bodega.warehouseLocation}</td>
                                                        <td className="text-nowrap text-center">
                                                            <button
                                                                data-toggle="tooltip" 
                                                                className="btn btn-sm btn-warning"
                                                                data-original-title="Editar"
                                                                onClick={()=> seleccionarBodega(bodega)}
                                                            ><i className="ti-pencil"></i></button>
                                                            <button
                                                                data-toggle="tooltip" 
                                                                className="btn btn-sm btn-danger"
                                                                data-original-title="Borrar"
                                                                onClick={()=>onClickEliminar(bodega)}
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