import React, {useState, useContext, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

import compraContext from '../../../Context/compras/compraContext';
import bodegaContext from '../../../Context/bodegas/bodegaContext';
import empleadoContext from '../../../Context/empleados/empleadoContext';
import AlertaContext from '../../../Context/alertas/alertaContext';

export default function FormularioCompra(){
    const history = useHistory()

    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const CompraContext = useContext(compraContext);
    const { compraseleccionada, errorcompra, actualizarCompra,  agregarCompra, validarCompra } = CompraContext;

    const BodegaContext = useContext(bodegaContext);
    const { bodegas, obtenerBodegas } = BodegaContext;

    const EmpleadoContext = useContext(empleadoContext);
    const { empleados, obtenerEmpleados } = EmpleadoContext;

    const [ loop ] = useState(0);

    const [compra, setCompra] = useState({
        codePurchase:"",
        warehouseId:"",
        employeeId:"",
        codeInvoice:"",
        datePurchase:"",
        typePaid:"",
        Balance:0,
        statusPurchase: ""
    })

    /*eslint-disable*/
    useEffect(()=>{
        obtenerEmpleados();
    },[loop])
    
    useEffect(()=>{
        obtenerBodegas();
    },[loop])
    /*eslint-enable*/

    useEffect(()=>{
        if(compraseleccionada !== null){
            //console.log('compra seleccionada ',compraseleccionada);
            setCompra(compraseleccionada);
        }else{
            setCompra({
                codePurchase:"",
                warehouseId:"",
                employeeId:"",
                codeInvoice:0,
                datePurchase:"",
                typePaid:"",
                Balance:0,
                statusPurchase: ""
            })
            
        }
    }, [compraseleccionada])

    const { codePurchase, codeInvoice, typePaid, Balance, statusPurchase, datePurchase } = compra

    const onChange = e =>{
        setCompra({
            ...compra,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e =>{
        e.preventDefault();
        //Validaciones
        if( typePaid.trim()==='' || statusPurchase.trim()===''){
            validarCompra();
            return;
        }

        if(codeInvoice < 0 || Balance < 0 ){
            validarCompra();
            return;
        }

         //Comprobamos si es agregar o editar
         if(compraseleccionada === null){
            agregarCompra(compra);
            mostrarAlerta('Compra agregada exitosamente!', 'alert-success');
            //Redirigimos a la tabla de ver compras
            history.push('/admin/compras');
            
        }else{
            actualizarCompra(compra);
            mostrarAlerta('Compra actualizada exitosamente!', 'alert-success')
            history.push('/admin/compras');
        }
    }

    return(
        <>
        <div className="row">
            <div className="col-md-10">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">{compraseleccionada ? 'Editar Compra': 'Agregar Compra'}</h4>
                        <hr/>
                        <div className="errores">
                            {errorcompra && ( <small className="text-danger">Todos los campos son obligatorio</small>) }
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
                            <label htmlFor="codePurchase">Código de Compra</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="codePurchase"
                                value={codePurchase}
                                onChange={onChange} 
                                placeholder="Código de compra"
                            />
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="datePurchase">Fecha de compra</label>
                            <input 
                                type="date" 
                                className="form-control"
                                name="datePurchase"
                                value={datePurchase}
                                onChange={onChange} 
                                placeholder="Fecha de compra"/>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="statusPurchase">Estado de la compra</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="statusPurchase"
                                value={statusPurchase}
                                onChange={onChange} 
                                placeholder="Estado de la compra"/>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="warehouseId">Bodega</label>
                            <select name="warehouseId" onChange={onChange} className="form-control">
                                <option value="">Seleccione Bodega</option>
                                {compraseleccionada ? (
                                    bodegas?.map(bodega=>(
                                        <option
                                            key={bodega._id}
                                            value={bodega._id}
                                            selected={bodega._id === compraseleccionada.warehouseId}
                                        >
                                            {bodega.warehouseName}  
                                        </option>
                                    ))
                                ): (
                                    bodegas?.map(bodega=>(
                                        <option
                                            key={bodega._id}
                                            value={bodega._id}
                                        >
                                            { bodega.warehouseName } 
                                        </option>
                                    ))
                                )}
                            </select>
                        </div>
                        
                        <div className="form-group col-md-8">
                            <label htmlFor="category">Empleado encargado</label>
                            <select name="employeeId" onChange={onChange} className="form-control">
                                <option value="">Seleccione Empleado</option>
                                {compraseleccionada ? (
                                    empleados?.map(empleado=>(
                                        <option
                                            key={empleado._id}
                                            value={empleado._id}
                                            selected={empleado._id === compraseleccionada.employeeId}
                                        >
                                            {empleado.personid.name} {empleado.personid.lastname} 
                                        </option>
                                    ))
                                ): (
                                    empleados?.map(empleado=>(
                                        <option
                                            key={empleado._id}
                                            value={empleado._id}
                                        >
                                            {empleado.personid.name} {empleado.personid.lastname} 
                                        </option>
                                    ))
                                )}
                            </select>
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
                            <label htmlFor="Balance">Balance</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="Balance"
                                value={Balance}
                                onChange={onChange} 
                                placeholder="Balance"/>
                        </div>
                        
                        <div className="form-group row m-b-0">
                            <div className="offset-sm-8 col-sm-10">
                                <button type="submit" className="btn btn-primary">
                                    <i className="ti-save p-2"></i>
                                    {compraseleccionada ? 'Editar Compra': 'Agregar Compra'}
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