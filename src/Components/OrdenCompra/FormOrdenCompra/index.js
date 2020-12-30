import React, {useState, useContext, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

import ordenesCompraContext from '../../../Context/ordenesCompra/ordenescompraContext';
import empleadoContext from '../../../Context/empleados/empleadoContext';
import clienteContext from '../../../Context/clientes/clienteContext';
import bodegaContext from '../../../Context/bodegas/bodegaContext';
import AlertaContext from '../../../Context/alertas/alertaContext';

export default function FormularioOrdenCompra(){
    const history = useHistory()

    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;

    const OrdenesCompraContext = useContext(ordenesCompraContext);
    const { errorordenescompra, agregarOrdenCompra, validarOrdenCompra } = OrdenesCompraContext;

    const EmpleadoContext = useContext(empleadoContext);
    const { empleados, obtenerEmpleados } = EmpleadoContext;

    const ClienteContext = useContext(clienteContext);
    const { clientes, obtenerClientes } = ClienteContext;

    const BodegaContext = useContext(bodegaContext);
    const { bodegas, obtenerBodegas } = BodegaContext;

    const [loop,] = useState(0);

    const [ordenCompra, setOrdenCompra] = useState({
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

    const onChange = e =>{
        setOrdenCompra({
            ...ordenCompra,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e =>{
        e.preventDefault();
        //Validaciones
        if(codePurchaseOrder.trim()==='' || status.trim()==='' || typePaid.trim()==='' ||  
           typeShip.trim()==='' || details.trim()==='' || costShip.trim()==='')
        {
            validarOrdenCompra();
            return;
        }
        
        agregarOrdenCompra(ordenCompra);
        mostrarAlerta('Orden de compra agregada exitosamente!', 'alert-success');
        
        //Redirigimos a la tabla de ver bodegas
        history.push('/admin/ordenescompras');
            
    }
    
    return(
        <>
        <div className="row">
            <div className="col-md-10">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Agregar Orden de Compra</h4>
                        <hr/>
                        <div className="errores">
                            {errorordenescompra ? ( <small className="text-danger">Todos los campos son obligatorio</small>) : null}
                        </div>
                        {alerta ? 
                            (
                                <div className={`alert ${alerta.tipoAlerta}`}>
                                    {alerta.msg}
                                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">X</span>
                                    </button>
                                </div>
                            ): null} 
                    <form onSubmit={handleSubmit}>
                        <div className="form-group col-md-8">
                            <label htmlFor="codePurchaseOrder">Código de Orden de Compra</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="codePurchaseOrder"
                                value={codePurchaseOrder}
                                onChange={onChange} 
                                placeholder="Código de orden de compra"
                            />
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="supplierId">Cliente</label>
                            <select name="supplierId" onChange={onChange} className="form-control">
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
                            </select>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="employeeId">Empleado encargado</label>
                            <select name="employeeId" onChange={onChange} className="form-control">
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
                            </select>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="datePurchaseOrder">Fecha</label>
                            <input 
                                type="date" 
                                className="form-control"
                                name="datePurchaseOrder"
                                value={datePurchaseOrder}
                                onChange={onChange} 
                                placeholder="Fecha de Orden de compra"/>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="total">Total</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="total"
                                value={total}
                                onChange={onChange} 
                                placeholder="Total"/>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="status">Estado</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="status"
                                value={status}
                                onChange={onChange} 
                                placeholder="Estado de la orden de compra"/>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="typePaid">Tipo de pago</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="typePaid"
                                value={typePaid}
                                onChange={onChange} 
                                placeholder="Tipo de pago"/>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="typeShip">Tipo de Envio</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="typeShip"
                                value={typeShip}
                                onChange={onChange} 
                                placeholder="Tipo de Envio"/>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="dateShip">Fecha de Envio</label>
                            <input 
                                type="date" 
                                className="form-control"
                                name="dateShip"
                                value={dateShip}
                                onChange={onChange} 
                                placeholder="Fecha de Envio"/>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="costShip">Costo de Envio</label>
                            <input 
                                type="number" 
                                className="form-control"
                                name="costShip"
                                value={costShip}
                                onChange={onChange} 
                                placeholder="Costo de Envio"/>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="warehouseId">Bodega</label>
                            <select name="warehouseId" onChange={onChange} className="form-control">
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
                            </select>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="details">Detalles</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="details"
                                value={details}
                                onChange={onChange} 
                                placeholder="Descripcion de la Bodega"/>
                        </div>
                        <div className="form-group col-md-8">
                            <div className="switch switch-primary d-inline m-r-10">
                                <input type="checkbox" id="switch-p-2" name="active" value={active} onChange={onChange}/>
                                <label htmlFor="switch-p-2" className="cr"></label>
                            </div>
                            <label htmlFor="">Activa</label>
                        </div>                    
                        <div className="form-group row m-b-0">
                            <div className="offset-sm-8 col-sm-10">
                                <button type="submit" className="btn btn-primary">
                                    <i className="ti-save p-2"></i>
                                    Agregar Orden de Compra
                                </button>
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