import React, {useState, useContext, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import ordenesCompraContext from '../../../Context/ordenesCompra/ordenescompraContext';
import productoContext from '../../../Context/productos/productoContext';
import AlertaContext from '../../../Context/alertas/alertaContext';
import TextoError from 'Components/Errors';

export default function AddProductoOrdenCompra() {
    const history = useHistory();

    const [ loop ] = useState(0);

    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const ProductoContext = useContext(productoContext);
    const { productos, obtenerProductos } = ProductoContext;

    const OrdenesCompraContext = useContext(ordenesCompraContext);
    const { agregarProductoOrdenCompra, ordencompraseleccionada } = OrdenesCompraContext;

    const validationSchema = Yup.object({
        productId: Yup.string().required('El estado de la orden es requerido'),
        cuantity: Yup.number().min(1,'La cantidad no puede ser menor a cero').required('La cantidad del producto es requerida'),
        cost: Yup.number().default(0).min(0,'El costo del producto no puede ser menor a cero').required('El costo del producto es requerido'),
        tax: Yup.number().default(0).min(0, 'El tax no puede ser menor a cero'),
        discount: Yup.number().default(0).min(0,'El descuento no puede ser menor a cero')
    });

    const [idOrdenCompra, setIdOrdenCompra ] = useState({
        purchaseOrderId: ''
    });

    const [formProductoOrdenCompra, setFormProductoOrdenCompra] = useState({
        productId: '',
        cuantity: 0,
        cost: 0,
        tax: 0,
        discount: 0
    })

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
    }, [ordencompraseleccionada])

    const handleSubmit = (formProductoOrdenCompra, submitProps) => {
        console.log(formProductoOrdenCompra);
        
        if(ordencompraseleccionada !== null){
            agregarProductoOrdenCompra(formProductoOrdenCompra, idOrdenCompra);
            mostrarAlerta('Producto agregado a la orden de compra', 'alert-success');
            submitProps.setSubmitting(false);
            submitProps.resetForm();
            history.push('/admin/ordenescompras/detalle');
        }
        
        setIdOrdenCompra({ purchaseOrderId: '' });
        setFormProductoOrdenCompra({
            productId: '',
            cuantity: 0,
            cost: 0,
            tax: 0,
            discount: 0
        })
    }

    return (
        <>
        <div className="row">
            <div className="col-md-10">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Agregar Producto a Orden de Compra</h4>
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
                    <Formik
                        initialValues={formProductoOrdenCompra}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                    <Form>
                        <div className="form-group col-md-8">
                            <label htmlFor="productId">Producto</label>
                            <Field
                                component='select'
                                id="productId"
                                name="productId"
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
                            </Field>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="cuantity">Cantidad del Producto</label>
                            <Field 
                                type="number" 
                                className="form-control"
                                id="cuantity"
                                name="cuantity"
                                placeholder="Cantidad del Producto"
                            />
                            <ErrorMessage name='cuantity' component={TextoError}/>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="cost">Costo</label>
                            <Field 
                                type="number" 
                                className="form-control"
                                id="cost"
                                name="cost"
                                placeholder="Costo"
                            />
                            <ErrorMessage name='cost' component={TextoError}/>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="tax">Tax</label>
                            <Field 
                                type="number" 
                                className="form-control"
                                id="tax"
                                name="tax"
                                placeholder="tax"
                            />
                            <ErrorMessage name='tax' component={TextoError}/>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="discount">Descuento</label>
                            <Field 
                                type="number" 
                                className="form-control"
                                id="discount"
                                name="discount"
                                placeholder="discount"
                            />
                            <ErrorMessage name='discount' component={TextoError}/>
                        </div>                                  
                        <div className="form-group row m-b-0">
                            <div className="offset-sm-7 col-sm-10">
                                <button type="submit" className="btn btn-primary">
                                    <i className="ti-save p-2"></i>
                                    Agregar Producto a Orden de Compra
                                </button>
                            </div>
                        </div>
                    </Form> 
                    </Formik> 
                </div>
            </div>
        </div>
        </div>
    </>
    )
}
