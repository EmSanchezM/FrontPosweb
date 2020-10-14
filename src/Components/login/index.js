import React, {useState, useContext, useEffect } from 'react';

import AuthContext from '../../Context/autenticacion/authContext';
import AlertaContext from '../../Context/alertas/alertaContext';

import logo from './logo.png'

export default function Login(props){
    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;

    const authContext = useContext(AuthContext);
    const {mensaje, autenticado, iniciarSesion} = authContext;

    useEffect(()=>{
        if(autenticado){ props.history.push('/admin'); } 
        if(mensaje){ mostrarAlerta(mensaje.msg, mensaje.tipoAlerta); } 
    },[mensaje, autenticado, props.history, mostrarAlerta])

    const [usuario, setUsuario] = useState({
        username: '',
        password: ''
    });

    const {username, password} = usuario;

    const onChange = e =>{
        setUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(username, password);

        //Validaciones
        if(username.trim()==='' || password.trim()===''){
            mostrarAlerta('El nombre de usuario y la contraseña son obligatorios', 'alert-danger alert-dismissible fade show')
        }
        
        iniciarSesion({username, password});
    }

    return (
        <>
        <div className="auth-wrapper">
            <div className="auth-content text-center">
                <img src={logo} alt="LOGO" className="img-fluid mb-4"/>
                {alerta ?
                    (
                    <div className={`alert ${alerta.tipoAlerta}`}>
                        {alerta.msg}
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">X</span>
                        </button>
                    </div>
                    )
                    : null
                }
                <div className="card borderless">
                    <div className="row align-items-center">
                        <div className="col-md-12">
                            <div className="card-body">
                                <h4 className="mb-3 f-w-400">Iniciar Sesion</h4>
                                <hr/>
                                 
                                <form  onSubmit={handleSubmit}>
                                    <div className="form-group mb-3">
                                        <input  type="text" 
                                                className="form-control"
                                                name="username"
                                                value={username} 
                                                onChange={onChange}
                                                placeholder="Nombre de usuario"/>
                                    </div>
                                    <div className="form-group mb-4">
                                        <input type="password" 
                                               className="form-control"
                                               name="password" 
                                               value={password} 
                                               onChange={onChange}
                                               placeholder="Contraseña"/>
                                    </div>
                                    <button className="btn btn-block btn-primary mb-4">
                                        Iniciar Sesion
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}