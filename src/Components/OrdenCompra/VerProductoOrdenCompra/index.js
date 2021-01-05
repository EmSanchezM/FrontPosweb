import React,  { useContext, useEffect, useState, useMemo } from 'react';
import { Link, useHistory } from 'react-router-dom';

import ordenesCompraContext from '../../../Context/ordenesCompra/ordenescompraContext';
import alertaContext from '../../../Context/alertas/alertaContext';

export default function ProductosOrdenCompra() {

    const history = useHistory();

    const OrdenesCompraContext = useContext(ordenesCompraContext);
    const { ordenescompras, ordencompraseleccionada, getProductosOrdenCompra, productosordencompra } = OrdenesCompraContext;

    const AlertaContext = useContext(alertaContext);
    const { alerta, mostrarAlerta } = AlertaContext;

    const [ consulta, setConsulta ] = useState('');
    const [filterProductosOrdenCompra, setFilterProductosOrdenCompra] = useState(productosordencompra);

    useEffect(() => {
        console.log(ordencompraseleccionada);
        if(ordencompraseleccionada != null){
            getProductosOrdenCompra(ordencompraseleccionada);
        }
        
    }, [ordencompraseleccionada]);

    useMemo(()=>{
        const result = ordenescompras.filter(ordencompra=>{
            return `${ordencompra.codePurchaseOrder}`
                    .toLowerCase()
                    .includes(consulta.toLowerCase())
        })
        setFilterProductosOrdenCompra(result);
    },[consulta, ordenescompras]);

    return (
        <>
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
                                            <th>Estado</th>
                                            <th>Tipo de pago</th>
                                            <th>Forma de envio</th>
                                            <th>Costo de envio</th>
                                            <th>Total</th>
                                            <th className="w100 text-nowrap">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filterProductosOrdenCompra.length === 0
                                            ?
                                            <tr><div className="alert alert-danger">No hay ordenes de compras</div></tr>
                                            :
                                            (
                                                filterProductosOrdenCompra.map(producto => {
                                                    return(
                                                    <tr key={producto._id}>  
                                                        <td>{producto.cuantity}</td>
                                                        <td className="">{producto.cost}</td>
                                                        <td>{producto.tax}</td>
                                                        <td>{producto.discount}</td>
                                                        <td>{producto.purchaseOrderId}</td>
                                                        <td>{producto.productId}</td>
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
        </>
    )
}
