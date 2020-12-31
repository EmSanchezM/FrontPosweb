import React, {useState, useContext, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import ordenesCompraContext from '../../../Context/ordenesCompra/ordenescompraContext';
import empleadoContext from '../../../Context/empleados/empleadoContext';
import clienteContext from '../../../Context/clientes/clienteContext';
import bodegaContext from '../../../Context/bodegas/bodegaContext';
import AlertaContext from '../../../Context/alertas/alertaContext';
import TextoError from 'Components/Errors';

export default function FormularioOrdenCompra(){
    const history = useHistory();

    const validationSchema = Yup.object({
        codePurchaseOrder: Yup.string().required('El código de la orden de compra es requerida'),
        datePurchaseOrder: Yup.date().required('La fecha de orden de compra es requerida'),
        total: Yup.number().min(1,'El total no puede ser menor a cero').required('El total de la orden de compra es requerida'),
        status: Yup.string().required('El estado de la orden es requerido'),
        typePaid: Yup.string().required('La forma de pago es requerida'),
        typeShip: Yup.string().required('La forma de envio es requerida'),
        dateShip: Yup.date().required('La fecha del envio es requerida'),
        costShip: Yup.number().min(1,'El costo de envio no puede ser menor a cero').required('El costo del envio es requerido'),
        details: Yup.string(),
        active: Yup.boolean()
    })

    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;

    const OrdenesCompraContext = useContext(ordenesCompraContext);
    const { agregarOrdenCompra } = OrdenesCompraContext;

    const EmpleadoContext = useContext(empleadoContext);
    const { empleados, obtenerEmpleados } = EmpleadoContext;

    const ClienteContext = useContext(clienteContext);
    const { clientes, obtenerClientes } = ClienteContext;

    const BodegaContext = useContext(bodegaContext);
    const { bodegas, obtenerBodegas } = BodegaContext;

    const [ loop ] = useState(0);

    const [ordenCompra, setOrdenCompra] = useState({
        codePurchaseOrder: '',
        supplierId:"",
        employeeId:"",
        datePurchaseOrder:"",
        total:0,
        status:"",
        typePaid:"",
        typeShip:"",
        dateShip:"",
        costShip:0,
        warehouseId:"",
        details:"",
        active:true
    })

    /*eslint-disable*/
    useEffect(()=>{
        obtenerEmpleados();
    },[loop]);

    useEffect(()=>{
        obtenerClientes();
    },[loop]);

    useEffect(()=>{
        obtenerBodegas();
    },[loop])
    /*eslint-enable*/

    const { codePurchaseOrder, datePurchaseOrder, total,status,typePaid, typeShip, dateShip, costShip, details, active } = ordenCompra

    const handleSubmit = (ordenCompra, submitProps) =>{
        agregarOrdenCompra(ordenCompra);
        mostrarAlerta('Orden de compra agregada exitosamente!', 'alert-success');
        submitProps.setSubmitting(false);
        submitProps.resetForm();
        //Redirigimos a la tabla de ver bodegas
        history.push('/admin/ordenescompras');
        setOrdenCompra({
            codePurchaseOrder: 0,
            supplierId:"",
            employeeId:"",
            datePurchaseOrder:"",
            total:0,
            status:"",
            typePaid:"",
            typeShip:"",
            dateShip:"",
            costShip:0,
            warehouseId:"",
            details:"",
            active:true
        })
    }
    
    return(
        <>
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Agregar Orden de Compra</h4>
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
                        initialValues={ordenCompra}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        <Form>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="form-group col-md-12">
                                                <label htmlFor="codePurchaseOrder">Código de Orden de Compra</label>
                                                <Field 
                                                    type="text" 
                                                    className="form-control"
                                                    id="codePurchaseOrder"
                                                    name="codePurchaseOrder"
                                                    value={codePurchaseOrder}
                                                    placeholder="Código de orden de compra"
                                                />
                                                <ErrorMessage name='codePurchaseOrder' component={TextoError}/>
                                            </div>
                                            <div className="form-group col-md-12">
                                                <label htmlFor="datePurchaseOrder">Fecha</label>
                                                <Field 
                                                    type="date" 
                                                    className="form-control"
                                                    id='datePurchaseOrder'
                                                    name="datePurchaseOrder"
                                                    value={datePurchaseOrder} 
                                                    placeholder="Fecha de Orden de compra"
                                                />
                                                <ErrorMessage name='datePurchaseOrder' component={TextoError}/>
                                            </div>
                                            <div className="form-group col-md-12">
                                                <label htmlFor="supplierId">Cliente</label>
                                                <Field
                                                    component='select'
                                                    id="supplierId"
                                                    name="supplierId"
                                                    className="form-control"
                                                >
                                                    <option value="">Seleccione Cliente</option>
                                                    {
                                                        clientes?.map(cliente=>(
                                                            <option
                                                                key={cliente._id}
                                                                value={cliente._id}
                                                            >
                                                                {cliente.personid.name} {cliente.personid.lastname} 
                                                            </option>
                                                        ))
                                                    }
                                                </Field>
                                            </div>
                                            <div className="form-group col-md-12">
                                                <div className="switch switch-primary d-inline m-r-10">
                                                    <Field 
                                                        type="checkbox" 
                                                        id="switch-p-2" 
                                                        name="active" 
                                                        value={active}

                                                    />  
                                                    <label htmlFor="switch-p-2" className="cr"></label>
                                                </div>
                                                <label htmlFor="">Activa</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="form-group col-md-12">
                                                <label htmlFor="employeeId">Empleado encargado</label>
                                                <Field
                                                    component='select'
                                                    id='employeeId'
                                                    name='employeeId'
                                                    className='form-control'
                                                >
                                                    <option value="">Seleccione Empleado</option>
                                                    {
                                                        empleados?.map(empleado=>(
                                                            <option
                                                                key={empleado._id}
                                                                value={empleado._id}
                                                            >
                                                                {empleado.personid.name} {empleado.personid.lastname} 
                                                            </option>
                                                        ))
                                                    }
                                                </Field>
                                            </div>
                                            <div className="form-group col-md-12">
                                                <label htmlFor="warehouseId">Bodega</label>
                                                <Field
                                                    component='select'
                                                    id="warehouseId"
                                                    name="warehouseId"
                                                    className="form-control"
                                                >
                                                    <option value="">Seleccione Bodega</option>
                                                        {
                                                            bodegas?.map(bodega=>(
                                                                <option
                                                                    key={bodega._id}
                                                                    value={bodega._id}
                                                                >
                                                                    {bodega.warehouseName} 
                                                                </option>
                                                            ))
                                                        }
                                                </Field>
                                            </div>
                                            <div className="form-group col-md-12">
                                                <label htmlFor="details">Detalles</label>
                                                <Field 
                                                    type="text" 
                                                    className="form-control"
                                                    id="details"
                                                    name="details"
                                                    value={details}
                                                    placeholder="Descripcion de la Bodega"
                                                />
                                                <ErrorMessage name='details' component={TextoError}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="form-group col-md-8">
                                                <label htmlFor="typeShip">Tipo de Envio</label>
                                                <Field 
                                                    type="text" 
                                                    className="form-control"
                                                    id="typeShip"
                                                    name="typeShip"
                                                    value={typeShip}
                                                    placeholder="Tipo de Envio"
                                                />
                                                <ErrorMessage name='typeShip' component={TextoError}/>
                                            </div>
                                            <div className="form-group col-md-8">
                                                <label htmlFor="dateShip">Fecha de Envio</label>
                                                <Field 
                                                    type="date" 
                                                    className="form-control"
                                                    id="dateShip"
                                                    name="dateShip"
                                                    value={dateShip}
                                                    placeholder="Fecha de Envio"
                                                />
                                                <ErrorMessage name='dateShip' component={TextoError}/>
                                            </div>
                                            <div className="form-group col-md-8">
                                                <label htmlFor="costShip">Costo de Envio</label>
                                                <Field 
                                                    type="number" 
                                                    className="form-control"
                                                    id="costShip"
                                                    name="costShip"
                                                    value={costShip}
                                                    placeholder="Costo de Envio"
                                                />
                                                <ErrorMessage name='costShip' component={TextoError}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="form-group col-md-12">
                                                <label htmlFor="typePaid">Tipo de pago</label>
                                                <Field 
                                                    type="text" 
                                                    className="form-control"
                                                    id="typePaid"
                                                    name="typePaid"
                                                    value={typePaid}
                                                    placeholder="Tipo de pago"
                                                />
                                                <ErrorMessage name='typePaid' component={TextoError}/>
                                            </div>
                                            <div className="form-group col-md-12">
                                                <label htmlFor="status">Estado</label>
                                                <Field 
                                                    type="text" 
                                                    className="form-control"
                                                    id="status"
                                                    name="status"
                                                    value={status}
                                                    placeholder="Estado de la orden de compra"
                                                />
                                                <ErrorMessage name='status' component={TextoError}/>
                                            </div>
                                            <div className="form-group col-md-12">
                                                <label htmlFor="total">Total</label>
                                                <Field 
                                                    type="text" 
                                                    className="form-control"
                                                    id="total"
                                                    name="total"
                                                    value={total}
                                                    placeholder="Total"
                                                />
                                                <ErrorMessage name='total' component={TextoError}/>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>                    
                        <div className="form-group row m-b-0">
                            <div className="offset-sm-8 col-sm-10">
                                <button type="submit" className="btn btn-primary">
                                    <i className="ti-save p-2"></i>
                                    Agregar Orden de Compra
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