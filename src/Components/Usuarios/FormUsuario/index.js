import React, {useState, useContext, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import usuarioContext from '../../../Context/usuarios/usuarioContext';
import TextoError from '../../Errors';

export default function FormularioUsuario(){
    const history = useHistory()

    const [usuario, setUsuario] = useState({
        employeeid: '',
        username: '',
        password: '',
        passwordRepeat: '',
        role: ''
    });

    const [ loop ] = useState(0);

    const validationSchema = Yup.object({
        employeeid: Yup.string().required('Empleado requerido'),
        username: Yup.string().required('El nombre de usuario es requerido'),
        password: Yup.string()
                    .min(6, 'Minimo 6 caracteres para la contraseña')
                    .required('La contraseña es un campo obligatorio'),
        passwordRepeat: Yup.string()
                           .oneOf([Yup.ref('password'), null], 'Contraseñas no coinciden')
                           .required('Repite tu contraseña para validar'),
        role: Yup.string().required('El rol de usuario es requerido')
    })

    const UsuarioContext = useContext(usuarioContext);
    const { errorusuario, empleados, obtenerEmpleados,  agregarUsuario } = UsuarioContext;

    /*eslint-disable*/
    useEffect(()=>{
        obtenerEmpleados();
    },[loop]);
    /*eslint-enable*/ 

    const handleSubmit = (usuario, submitProps) =>{
        
        //console.log(usuario);
        //console.log('submit props', submitProps);

        const { employeeid, username, password, role } = usuario
    
        agregarUsuario({username, password, role, employeeid});
        submitProps.setSubmitting(false);
        submitProps.resetForm();
        //Redirigimos a la tabla de ver empleados
        history.push('/admin/usuarios');
        
        //Reiniciamos el formulario
        setUsuario({
            employeeid: '',
            username: '',
            password: '',
            passwordRepeat:'',
            role: ''
        })
    }

    return(
        <>
        <div className="row">
            <div className="col-md-10">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Agregar Usuario</h4>
                        <hr/>
                        <div className="errores">
                        {errorusuario && ( <small className="text-danger">Todos los campos son obligatorio</small>)}
                        </div>
                        <Formik
                            initialValues={usuario}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                        <Form>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <h4 className="card-title">Datos Usuario</h4>
                                            <hr/>
                                            <div className="form-group col-md-8">
                                                <label htmlFor="empleado">Empleado</label>
                                                <Field 
                                                    component='select'
                                                    name="employeeid"
                                                    id='employeeid'
                                                    className="form-control">
                                                    <option value="">Seleccione el empleado</option>
                                                    {empleados.map(empleado=>(
                                                        <option
                                                            key={empleado._id}
                                                            value={empleado._id}
                                                        >
                                                            {` ${empleado.personid.name} ${empleado.personid.lastname}`} 
                                                        </option>
                                                    ))}
                                                </Field>
                                            </div>
                                            <div className="form-group col-md-8">
                                                <label htmlFor="username">Nombre de Usuario</label>
                                                <Field 
                                                    type="text" 
                                                    className="form-control"
                                                    name="username"
                                                    id="username" 
                                                    placeholder="Nombre de Usuario"
                                                />
                                                <ErrorMessage name='username' component={TextoError}/>
                                            </div>
                                            <div className="form-group col-md-8">
                                                <label htmlFor="password">Contraseña</label>
                                                <Field 
                                                    type="password" 
                                                    className="form-control"
                                                    name="password"
                                                    id="password" 
                                                    placeholder="Contraseña"
                                                />
                                                <ErrorMessage name='password' component={TextoError}/>
                                            </div>
                                            <div className="form-group col-md-8">
                                                <label htmlFor="passwordRepeat">Repita su Contraseña</label>
                                                <Field 
                                                    type="password" 
                                                    className="form-control"
                                                    name="passwordRepeat"
                                                    id="passwordRepeat" 
                                                    placeholder="Repita la Contraseña"
                                                />
                                                <ErrorMessage name='passwordRepeat' component={TextoError}/>
                                            </div>
                                            <div className="form-group col-md-8">
                                                <label htmlFor="role">Rol de Usuario</label>
                                                <Field 
                                                    type="text" 
                                                    className="form-control" 
                                                    name="role"
                                                    id="role"
                                                    placeholder="Rol de Usuario"
                                                />
                                                <ErrorMessage name='role' component={TextoError}/>                 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                           </div>
                           <div className="form-group row m-b-0">
                                <div className="offset-sm-8 col-sm-10">
                                    <button type="submit" className="btn btn-primary">
                                        <i className="ti-save p-2"></i>
                                       Agregar Usuario
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