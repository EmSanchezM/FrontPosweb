import React, {useState, useContext, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

import bodegaContext from '../../../Context/bodegas/bodegaContext';
import empleadoContext from '../../../Context/empleados/empleadoContext';
import AlertaContext from '../../../Context/alertas/alertaContext';

export default function FormularioBodega(){
    const history = useHistory()

    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;

    const [loop, setLoop] = useState(0);

    const [bodega, setBodega] = useState({
        codeWarehouse:"",
        warehouseName:"",
        warehouseLocation:"",
        warehousePhone1:"",
        warehousePhone2:"",
        employeeId:"",
        details:"",
        active:true
    })

    const BodegaContext = useContext(bodegaContext);
    const { bodegaseleccionada, errorbodega, actualizarBodega,  agregarBodega, validarBodega } = BodegaContext;

    
    const EmpleadoContext = useContext(empleadoContext);
    const { empleados, obtenerEmpleados } = EmpleadoContext;
    
  
    useEffect(()=>{
        obtenerEmpleados();
    },[loop])

    useEffect(()=>{
        if(bodegaseleccionada !== null){
            console.log('bodega seleccionado ',bodegaseleccionada);
            setBodega(bodegaseleccionada);
        }else{
            setBodega({
                codeWarehouse:"",
                warehouseName:"",
                warehouseLocation:"",
                warehousePhone1:"",
                warehousePhone2:"",
                employeeId:"",
                details:"",
                active:true
            })
            
        }
    }, [bodegaseleccionada])

    const { codeWarehouse, warehouseName, warehouseLocation,warehousePhone1,warehousePhone2, details,active } = bodega

    const onChange = e =>{
        setBodega({
            ...bodega,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e =>{
        e.preventDefault();
        //Validaciones
        if(codeWarehouse.trim()==='' || warehouseName.trim()==='' || warehouseLocation.trim()==='' ||  
            warehousePhone1.trim()==='' || details.trim()==='' || warehousePhone2.trim()==='')
        {
            validarBodega();
            return;
        }

         //Comprobamos si es agregar o editar
         if(bodegaseleccionada === null){
            agregarBodega(bodega);
            mostrarAlerta('Bodega agregada exitosamente!', 'alert-success');
            //Redirigimos a la tabla de ver bodegas
            history.push('/admin/bodegas');
            
        }else{
            actualizarBodega(bodega);
            mostrarAlerta('Bodega actualizada exitosamente!', 'alert-success')
            history.push('/admin/bodegas');
        }
    }

    return(
        <>
        <div className="row">
            <div className="col-md-10">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">{bodegaseleccionada ? 'Editar Bodega': 'Agregar Bodega'}</h4>
                        <hr/>
                        <div className="errores">
                            {errorbodega ? ( <small className="text-danger">Todos los campos son obligatorio</small>) : null}
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
                            <label htmlFor="codeWarehouse">Código de Bodega</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="codeWarehouse"
                                value={codeWarehouse}
                                onChange={onChange} 
                                placeholder="Código de bodega"
                            />
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="warehouseName">Nombre de bodega</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="warehouseName"
                                value={warehouseName}
                                onChange={onChange} 
                                placeholder="Nombre de bodega"/>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="warehouseLocation">Ubicación</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="warehouseLocation"
                                value={warehouseLocation}
                                onChange={onChange} 
                                placeholder="Ubicación de la bodega"/>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="warehousePhone1">Telefono</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="warehousePhone1"
                                value={warehousePhone1}
                                onChange={onChange} 
                                placeholder="Telefono de la bodega"/>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="warehousePhone2">Telefono</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="warehousePhone2"
                                value={warehousePhone2}
                                onChange={onChange} 
                                placeholder="Telefono de la bodega (Opcional)"/>
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
                            <label htmlFor="category">Empleado encargado</label>
                            <select name="categoryId" onChange={onChange} className="form-control">
                                <option value="">Seleccione Empleado</option>
                                {bodegaseleccionada ? (
                                    empleados?.map(empleado=>(
                                        <option
                                            key={empleado._id}
                                            value={empleado._id}
                                            selected={empleado._id === bodegaseleccionada.employeeId}
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
                                    {bodegaseleccionada ? 'Editar Bodega': 'Agregar Bodega'}
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