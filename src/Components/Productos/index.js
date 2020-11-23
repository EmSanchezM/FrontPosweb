import React,  { useContext, useEffect, useState, useMemo } from 'react';
import { Link, useHistory } from 'react-router-dom';

import productoContext from '../../Context/productos/productoContext';
import alertaContext from '../../Context/alertas/alertaContext';

export default function Productos(){
    const history = useHistory();

    const ProductoContext = useContext(productoContext);
    const { productos, obtenerProductos, guardarProductoActual, eliminarProducto } = ProductoContext;

    const AlertaContext = useContext(alertaContext);
    const {alerta, mostrarAlerta} = AlertaContext;
    let confirm;

    const [consulta, setConsulta] = useState('');
    const [filterProductos, setFilterProductos] = useState(productos);

    useEffect(()=>{
        obtenerProductos();
    }, [obtenerProductos]);

    useMemo(()=>{
        const result = productos.filter(producto=>{
            return `${producto.name}
                    ${producto.codeProduct}`
                    .toLowerCase()
                    .includes(consulta.toLowerCase())
        })
        setFilterProductos(result);
    },[consulta, productos])

    const seleccionarProducto = producto => {
        guardarProductoActual(producto);
        history.push('productos/nuevo');
    }

    const onClickEliminar = producto => {
        confirm = window.confirm('¿Estas seguro de eliminarlo?');
        
        if(confirm){
            eliminarProducto(producto);
            mostrarAlerta('Producto eliminado exitosamente!', 'alert-success');
            obtenerProductos();
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
                                        placeholder="Buscar producto..."
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
                                    <h4 className="card-title">Productos( {productos.length} )</h4>
                                </div>
                                <div className="col-4 mb-2">
                                    <div className="text-right">
                                        <Link className="btn btn-sm btn-primary" to='/admin/productos/nuevo'>
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
                                            <th>COD. Producto</th>
                                            <th>Nombre Producto</th>
                                            <th>Descripción</th>
                                            <th>Stock</th>
                                            <th className="w100 text-nowrap">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filterProductos.length === 0
                                            ?
                                            <tr><div className="alert alert-danger">No hay productos</div></tr>
                                            :
                                            (
                                                filterProductos.map(producto => {
                                                    return(
                                                    <tr key={producto._id}>  
                                                        <td>{producto.codeProduct}</td>
                                                        <td>{producto.name}</td>
                                                        <td>{producto.description}</td>
                                                        <td>{producto.inStock}</td>
                                                        <td className="text-nowrap text-center">
                                                            <button
                                                                data-toggle="tooltip" 
                                                                className="btn btn-sm btn-warning"
                                                                data-original-title="Editar"
                                                                onClick={()=> seleccionarProducto(producto)}
                                                            ><i className="ti-pencil"></i></button>
                                                            <button
                                                                data-toggle="tooltip" 
                                                                className="btn btn-sm btn-danger"
                                                                data-original-title="Borrar"
                                                                onClick={()=>onClickEliminar(producto)}
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
                                            filterProductos.length === 0
                                            ?
                                            <tr>No hay productos</tr>
                                            :
                                            (
                                                filterProductos.map((producto, i) => {
                                                    return(
                                                    <tr key={i} >  
                                                        <td>{producto.cost} Lps.</td>
                                                        <td>{producto.price1} Lps.</td>
                                                        <td>{producto.price2} Lps.</td>
                                                        <td>{producto.price3} Lps.</td>
                                                        <td>{producto.price4} Lps.</td>
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