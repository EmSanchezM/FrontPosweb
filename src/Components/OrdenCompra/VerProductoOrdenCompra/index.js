import React,  { useContext, useEffect, useState, useMemo } from 'react';
import { useParams, useHistory } from 'react-router-dom';

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
    const [ consulta, setConsulta ] = useState('');
    const [filterProductosOrdenCompra, setFilterProductosOrdenCompra] = useState(productosOrdenCompra);

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

    useMemo(()=>{
        const result = productosOrdenCompra?.filter(producto=>{
            return `${producto.cost}`
                    .toLowerCase()
                    .includes(consulta.toLowerCase())
        })
        setFilterProductosOrdenCompra(result);
    },[consulta, productosOrdenCompra]);

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
        </>
    )
}
