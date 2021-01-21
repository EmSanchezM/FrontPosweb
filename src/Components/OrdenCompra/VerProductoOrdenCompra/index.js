import React,  { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import noPhoto from 'assets/images/no-photo.png';

import ordenesCompraContext from '../../../Context/ordenesCompra/ordenescompraContext';

export default function ProductosOrdenCompra() {

    const history = useHistory();
    const { id } = useParams();

    const OrdenesCompraContext = useContext(ordenesCompraContext);
    const { getProductosOrdenCompra, productosordencompra } = OrdenesCompraContext;

    const [ productosOrdenCompra, setProductosOrdenCompra ] = useState([]);
    
    /*eslint-disable*/
    useEffect(() => {   
        getProductosOrdenCompra(id);
    }, []);

    useEffect(() => {
        if(id != null){
            setProductosOrdenCompra(productosordencompra);
        }else{
            setProductosOrdenCompra([]);
        }
        
    }, [id]);
    /*eslint-enable*/

    const handleViewPDF = () => {
        history.push('/admin/orden-compra/pdf');
    }

    return (
        <>
        <div className="row">
            {
                productosOrdenCompra.length === 0 ? (<div className="alert alert-danger">No hay productos en esta orden</div> )
                : 
                <>
                    <div className="col-md-8">
                        <div className="card table-card">
                    <div className="card-header">
                        {
                            productosOrdenCompra?.map(({purchaseOrderId})=>{
                                return(
                                    <div key={purchaseOrderId._id}>
                                        <h4>Orden de compra con código ({purchaseOrderId.codePurchaseOrder})</h4>
                                        <span>Fecha: {new Date(purchaseOrderId.datePurchaseOrder).toLocaleDateString()}</span>
                                        <br/>
                                        <span>Forma de Pago: {purchaseOrderId.typePaid}</span>
                                        <p>{purchaseOrderId.details}</p>
                                    </div>
                                )
                            })
                        }
                        <div className="card-header-right">
                            <div
                                data-toggle="tooltip" 
                                className="btn btn-sm btn-primary"
                                data-original-title="Ver PDF"
                                onClick={handleViewPDF}
                            ><i className="ti-printer p-2"></i>Ver PDF</div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-borderless mb-0">
                                <tbody>
                                    {
                                        productosOrdenCompra?.map(({productId})=> {
                                            return(
                                                <tr className="border-top" key={productId._id}>
                                                    <td>
                                                        <div className="d-inline-block align-middle text-center">
                                                            <img src={noPhoto} alt="producto" height="90"/>
                                                        </div>
                                                        <div className="d-inline-block align-middle m-l-10">
                                                            <span className="text-body">
                                                                <h5 className="mb-1">{productId.name}</h5>
                                                            </span>
                                                            <p className="text-muted mb-1">{productId.description}</p>
                                                            <p className="text-muted mb-1">{productId.brand} {productId.year}</p>
                                                            <h4>{productId.price1} Lps</h4>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
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
                                            Costo
                                            <span className="float-right">{productOrden.cost}</span>
                                        </h6>
                                        <h6 className="mb-2">
                                            Precios ({productOrden.cuantity} Items)
                                            <span className="float-right">{productOrden.productId.price1 * productOrden.cuantity}</span>
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
                                            <span className="float-right">{(productOrden.cost+ productOrden.tax + (productOrden.productId.price1 * productOrden.cuantity))} </span>
                                        </h6>

                                    </div>
                                )
                            })
                        }
                        
                    </div>
                </div>
            </div>
                </>
            }
        </div>
        </>
    )
}
