import React,  { useContext, useEffect, useState, useMemo } from 'react';
import { Link, useHistory } from 'react-router-dom';

import bodegaContext from '../../Context/bodegas/bodegaContext';
import alertaContext from '../../Context/alertas/alertaContext';

export default function Bodegas(){
    const history = useHistory();

    const [loop, setLoop] = useState(0)

    const BodegaContext = useContext(bodegaContext);
    const { bodegas, obtenerBodegas, guardarBodegaActual, eliminarBodega } = BodegaContext;

    const AlertaContext = useContext(alertaContext);
    const {alerta, mostrarAlerta} = AlertaContext;
    let confirm;

    const [consulta, setConsulta] = useState('');
    const [filterBodegas, setFilterBodegas] = useState(bodegas);

    useEffect(()=>{
        obtenerBodegas();
    }, [loop]);

    useMemo(()=>{
        const result = bodegas.filter(bodega=>{
            return `${bodega.name}`
                    .toLowerCase()
                    .includes(consulta.toLowerCase())
        })
        setFilterbodegas(result);
    },[consulta, bodegas])

    const seleccionarBodega = bodega => {
        guardarBodegaActual(bodega);
        history.push('bodegas/nuevo');
    }

    const onClickEliminar = bodega => {
        confirm = window.confirm('¿Estas seguro de eliminarlo?');
        
        if(confirm){
            eliminarBodega(bodega);
            mostrarAlerta('Bodega eliminado exitosamente!', 'alert-success');
            obtenerbodegas();
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
                                        <Link className="btn btn-sm btn-primary" to='/admin/bodegas/nuevo'>
                                            <span className="pcoded-micon"><i className="ti-user"></i></span>
                                            <span className="pcoded-mtext p-2">Agregar</span>
                                        </Link>
                                        <button className="btn btn-sm btn-primary m-2"
                                                data-toggle="modal"
                                                data-target="#modalVerMas"
                                        >
                                            <span className="pcoded-micon"><i className="ti-plus"></i></span>
                                            <span className="pcoded-mtext p-2">Ver mas..</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>COD. Bodega</th>
                                            <th>Nombre Bodega</th>
                                            <th>Descripción</th>
                                            <th>Stock</th>
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
                                                filterBodegas.map(Bodega => {
                                                    return(
                                                    <tr key={bodega._id}>  
                                                        <td>{bodega.codeProduct}</td>
                                                        <td>{bodega.name}</td>
                                                        <td>{bodega.description}</td>
                                                        <td>{bodega.inStock}</td>
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
            <div id="modalVerMas" 
                 className="modal fade"
                 tabIndex="-1"
                 role="dialog"
                 aria-modal="true"
            >
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Más datos...</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="close">
                                <span aria-hidden="true">x</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="table-responsive">
                            <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Costo</th>
                                            <th>Precio Unitario</th>
                                            <th>Precio Minorista</th>
                                            <th>Precio Mayorista</th>
                                            <th>Precio descuento</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filterBodegas.length === 0
                                            ?
                                            <tr>No hay bodegas</tr>
                                            :
                                            (
                                                filterBodegas.map((bodega, i) => {
                                                    return(
                                                    <tr key={i}>  
                                                        <td>{bodega.cost} Lps.</td>
                                                        <td>{bodega.price1} Lps.</td>
                                                        <td>{bodega.price2} Lps.</td>
                                                        <td>{bodega.price3} Lps.</td>
                                                        <td>{bodega.price4} Lps.</td>
                                                    </tr> 
                                                    )
                                                })
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" aria-label="close">
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>    
            </div>            
        </>
    )

    
}