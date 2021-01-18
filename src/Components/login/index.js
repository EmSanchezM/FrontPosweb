import React, {useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import Spinner from '../Spinner';
import TextoError from '../Errors';

import AuthContext from '../../Context/autenticacion/authContext';
import AlertaContext from '../../Context/alertas/alertaContext';

import logo from './logo.png';

export default function Login(){

    const history = useHistory()

    const alertaContext = useContext(AlertaContext);
    const { alerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const {role, autenticado, iniciarSesion} = authContext;

    useEffect(()=>{
        if(autenticado){
            //console.log(usuarioAuth);
            if(role==='USER_ROLE')
                history.push('admin/inicio')
        } 
        
    },[role, autenticado, history])

    
    const [usuario, setUsuario] = useState({
        username: '',
        password: ''
    });

    const validationSchema = Yup.object({
        username: Yup.string().required('El nombre de usuario es obligatorio'),
        password: Yup.string().required('La contraseña es un campo obligatorio')
    })

    const [loading, setLoading] = useState(false);

    //const {username, password} = usuario;

    const handleSubmit = (usuario, submitProps) =>{
        //console.log(usuario);
        //console.log('submit props ', submitProps);

        setLoading(true)

        iniciarSesion(usuario);
        submitProps.setSubmitting(false);
        submitProps.resetForm();
        setLoading(false);
        setUsuario({
            username: '',
            password: ''
        })
    }

    return (
        <>
        <div className="auth-wrapper">
            <div className="auth-content text-center">
                {
                    loading &&
                        <Spinner/>
                }
                
                <img src={logo} alt="LOGO" className="img-fluid mb-4"/>
                {alerta &&
                    (
                    <div className={`alert ${alerta.tipoAlerta}`}>
                        {alerta.msg && 'Credenciales incorrectas'}
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">X</span>
                        </button>
                    </div>
                    )
                }
                <div className="card borderless">
                    <div className="row align-items-center">
                        <div className="col-md-12">
                            <div className="card-body">
                                <h4 className="mb-3 f-w-400">Iniciar Sesion</h4>
                                <hr/>
                                 
                                <Formik
                                    initialValues={usuario}
                                    validationSchema={validationSchema}  
                                    onSubmit={handleSubmit}
                                >
                                <Form>
                                    <div className="form-group mb-3">
                                        <Field  type="text" 
                                                className="form-control"
                                                name="username"
                                                id="username"
                                                placeholder="Nombre de usuario"
                                        />
                                        <ErrorMessage name='username' component={TextoError}/>
                                    </div>
                                    <div className="form-group mb-4">
                                        <Field type="password" 
                                               className="form-control"
                                               name="password" 
                                               id="password" 
                                               placeholder="Contraseña"
                                        />
                                        <ErrorMessage name='password' component={TextoError}/>
                                    </div>
                                    <button type="submit" className="btn btn-block btn-primary mb-4">
                                        Iniciar Sesion
                                    </button>
                                </Form>
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}