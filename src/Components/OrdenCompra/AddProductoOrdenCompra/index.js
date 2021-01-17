import React, {useState, useContext, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import ordenesCompraContext from '../../../Context/ordenesCompra/ordenescompraContext';
import productoContext from '../../../Context/productos/productoContext';
import AlertaContext from '../../../Context/alertas/alertaContext';

export default function AddProductoOrdenCompra() {
    const history = useHistory();

    const [ loop ] = useState(0);

    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const ProductoContext = useContext(productoContext);
    const { productos, obtenerProductos } = ProductoContext;

    const OrdenesCompraContext = useContext(ordenesCompraContext);
    const { agregarProductoOrdenCompra, ordencompraseleccionada } = OrdenesCompraContext;

    const [idOrdenCompra, setIdOrdenCompra ] = useState({
        purchaseOrderId: ''
    });

    const [productoFields, setProductoFields ] = useState([{
        index: uuidv4(),
        productId: '',
        cuantity: 0,
        cost: 0,
        tax: 0,
        discount: 0
    }])


    /*eslint-disable*/
    useEffect(() => {
        obtenerProductos();
    }, [loop]);
    /*eslint-enable*/

    useEffect(() => {
        if(ordencompraseleccionada !== null){
            console.log('orden seleccionada ',ordencompraseleccionada);
        
            setIdOrdenCompra({
                purchaseOrderId: ordencompraseleccionada._id
            })
        }
    }, [ordencompraseleccionada]);

    
    const handleChangeInput = (id, e) => {
        const newProductoFields = productoFields.map( i => {
            if(id === i.index){
                i[e.target.name] = e.target.value
            }
            return i;
        })

        setProductoFields(newProductoFields);
    }

    const handleAddFields = () => {
        setProductoFields([
            ...productoFields, 
            { 
                index: uuidv4(),
                productId: '',
                cuantity: 0,
                cost: 0,
                tax: 0,
                discount: 0
            }
        ])
    }

    const handleRemoveFields = id => {
        const values = [...productoFields];
        values.splice(values.findIndex(value=> value.id === id), 1);
        setProductoFields(values);
    }

    const handleProductSubmit = (e) => {
        e.preventDefault();
        console.log('productos', productoFields);
        
        if(ordencompraseleccionada !== null){
            agregarProductoOrdenCompra(productoFields, idOrdenCompra);
            mostrarAlerta('Producto agregado a la orden de compra', 'alert-success');
            
            history.push('/admin/ordenescompras/detalle');
        }
        
    }
    
    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="card">            
                        <div className="card-body">
                            <h4 className="card-title">Productos de la orden de compra</h4>
                            <hr/>
                            {alerta && 
                                (
                                    <div className={`alert ${alerta.tipoAlerta}`}>
                                        {alerta.msg}
                                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">X</span>
                                        </button>
                                    </div>
                                )
                            } 
                            <form className="form-inline" onSubmit={handleProductSubmit}>
                                {productoFields?.map(productoField => (
                                <div key={productoField.index}>
                                    <div className="form-group mb-2">
                                        <select 
                                            name="productId" 
                                            onChange={e => handleChangeInput(productoField.index, e)} 
                                            className="form-control"
                                        >
                                            <option value="">Seleccione Producto</option>
                                            {
                                                productos?.map(producto=>(
                                                    <option
                                                        key={producto._id}
                                                        value={producto._id}
                                                    >
                                                        {producto.name} 
                                                    </option>
                                                ))
                                            }
                                        </select>
                                        
                                        <div className="form-group">
                                            <label htmlFor="cuantity">Cantidad</label>
                                            <input 
                                                name="cuantity"
                                                type="number"
                                                placeholder="Cantidad"
                                                className="form-control ml-2"
                                                value={productoField.cuantity}
                                                onChange={e=> handleChangeInput(productoField.index, e)}
                                            />
                                        </div>
                                    <div className="form-group">
                                        <label htmlFor="cost">Costo</label>
                                        <input 
                                            name="cost"
                                            type="number"
                                            placeholder="Costo"
                                            className="form-control"
                                            value={productoField.cost}
                                            onChange={e=> handleChangeInput(productoField.index, e)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="tax">Tax</label>
                                        <input 
                                            name="tax"
                                            className="form-control"
                                            type="number"
                                            placeholder="Tax"
                                            value={productoField.tax}
                                            onChange={e=> handleChangeInput(productoField.index, e)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="discount">Descuento</label>
                                        <input
                                            name="discount"
                                            className="form-control" 
                                            type="number"
                                            placeholder="Descuento"
                                            value={productoField.discount}
                                            onChange={e=> handleChangeInput(productoField.index, e)}
                                        />
                                    </div>
                                    <div className="form-group mt-2">
                                        <button
                                            data-toggle="tooltip" 
                                            className="btn btn-sm btn-success"
                                            data-original-title="Productos"
                                            onClick={()=>handleAddFields(productoField.index)}
                                        ><i className="ti-plus"></i></button>
                                        <button
                                            data-toggle="tooltip" 
                                            className="btn btn-sm btn-danger"
                                            data-original-title="Borrar"
                                            disabled={productoFields.length === 1}
                                            onClick={()=>handleRemoveFields(productoField.index)}
                                        ><i className="ti-trash"></i></button>
                                    </div>
                
                                    </div>
                                    
                                </div>
                                    
                                ))}
                                <div className="form-group row m-b-0">
                                    <div className="offset-sm-12 col-sm-10">
                                        <button
                                            data-toggle="tooltip" 
                                            className="btn btn-sm btn-primary"
                                            data-original-title="Enviar"
                                            onClick={handleProductSubmit}
                                        ><i className="ti-save p-2"></i>Guardar</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>        
        
        </>
    )
}
