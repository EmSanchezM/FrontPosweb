import React,  { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ordenesCompraContext from '../../../Context/ordenesCompra/ordenescompraContext';
//import alertaContext from '../../../Context/alertas/alertaContext';

export default function ProductosOrdenCompra() {

    //const history = useHistory();
    const { id } = useParams();

    const OrdenesCompraContext = useContext(ordenesCompraContext);
    const { getProductosOrdenCompra, productosordencompra } = OrdenesCompraContext;

    //const AlertaContext = useContext(alertaContext);
    //const { alerta, mostrarAlerta } = AlertaContext;

    const [ productosOrdenCompra, setProductosOrdenCompra ] = useState([]);
    //const [ consulta, setConsulta ] = useState('');
    //const [ filterProductosOrdenCompra, setFilterProductosOrdenCompra ] = useState(productosOrdenCompra);

    /*eslint-disable*/
    useEffect(() => {   
        getProductosOrdenCompra(id);
    }, [getProductosOrdenCompra]);

    useEffect(() => {
        if(id != null){
            setProductosOrdenCompra(productosordencompra);
        }else{
            setProductosOrdenCompra([]);
        }
        
    }, [id]);
    /*eslint-enable*/

    /*useMemo(()=>{
        const result = productosOrdenCompra?.filter(producto=>{
            return `${producto.cost}`
                    .toLowerCase()
                    .includes(consulta.toLowerCase())
        })
        setFilterProductosOrdenCompra(result);
    },[consulta, productosOrdenCompra]);*/

    return (
        <>
        <div className="row">
            <div className="col-md-8">
                <div className="card table-card">
                    <div className="card-header">
                        <h4>Orden de compra con código (1)</h4>
                        
                        <span>Nombre del encargado</span>
                        <p>Ubicacion de Bodega</p>
                        <div className="card-header-right">
                            <div
                                data-toggle="tooltip" 
                                className="btn btn-sm btn-primary"
                                data-original-title="Ver PDF"
                                
                            ><i className="ti-printer p-2"></i>Ver PDF</div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-borderless mb-0">
                                <tbody>
                                    {
                                        productosOrdenCompra?.map(productOrder=> {
                                            return(
                                                <tr className="border-top" key={productOrder._id}>
                                                    <td>
                                                        <div className="d-inline-block align-middle text-center">
                                                            <img src="" alt="producto"/>
                                                        </div>
                                                        <div className="d-inline-block align-middle m-l-10">
                                                            <span className="text-body">
                                                                <h5 className="mb-1">{productOrder.productId}</h5>
                                                            </span>
                                                            <p className="text-muted mb-1">Lenovo IdeaPad 330s</p>
                                                            <p className="text-muted mb-1">2019</p>
                                                            <h4>2500 Lps</h4>
                                                            
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                    <tr className="border-top">
                                        <td>
                                            <div className="d-inline-block align-middle m-l-10">
                                                <span className="text-body">
                                                    <h5 className="mb-1">Laptop</h5>
                                                </span>
                                                <p className="text-muted mb-1">Lenovo IdeaPad 530s</p>
                                                <p className="text-muted mb-1">2020</p>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="border-top">
                                        <td>
                                            <div className="d-inline-block align-middle m-l-10">
                                                <span className="text-body">
                                                    <h5 className="mb-1">Laptop</h5>
                                                </span>
                                                <p className="text-muted mb-1">Lenovo HP Omen</p>
                                                <p className="text-muted mb-1">2019</p>
                                            </div>
                                        </td>
                                    </tr>
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card">
                    <div className="card-header">
                        <h5>DETALLES</h5>
                    </div>
                    <div className="card-body">
                        {
                            productosOrdenCompra?.map(productOrden => {
                                return (
                                    <div key={productOrden._id}>
                                        <h6 className="mb-2">
                                            Subtotal
                                            <span className="float-right">{productOrden.cost}</span>
                                        </h6>
                                        <h6 className="mb-2">
                                            Tax
                                            <span className="float-right">{productOrden.tax}</span>
                                        </h6>
                                        <h6 className="mb-2">
                                            Descuentos
                                            <span className="float-right">{productOrden.discount}</span>
                                        </h6>
                                        <hr/>
                                        <h6 className="mb-0">
                                            Total
                                            <span className="float-right">{(productOrden.cost+ productOrden.tax + 340)} </span>
                                        </h6>

                                    </div>
                                )
                            })
                        }
                        
                    </div>
                </div>
            </div>
        </div>
        {/*
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="input-group-text"><i className="ti-search"></i></div>
                            </div>
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Buscar Orden de compra..."
                                name="consulta"
                                value={consulta}
                                onChange={e=> setConsulta(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Cantidad</th>
                                            <th>Costo</th>
                                            <th>Tax</th>
                                            <th>Descuento</th>
                                            <th>Orden de Compra</th>
                                            <th>Producto</th>
                                            <th className="w100 text-nowrap">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filterProductosOrdenCompra.length === 0
                                            ?
                                            <tr><div className="alert alert-danger">No hay productos en esta orden de compra</div></tr>
                                            :
                                            (
                                                filterProductosOrdenCompra.map(producto => {
                                                    return(
                                                    <tr key={producto._id}>  
                                                        <td>{producto.productId}</td>
                                                        <td>{producto.cuantity}</td>
                                                        <td>{producto.cost}</td>
                                                        <td>{producto.tax}</td>
                                                        <td>{producto.discount}</td>
                                                        <td>{producto.purchaseOrderId}</td>
                                                        <td className="text-nowrap text-center">
                                                            
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
        */}
        </>
    )
}
