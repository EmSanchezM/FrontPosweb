import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';

import Axios from '../../config/axios';

import { LOGIN_EXITOSO, LOGIN_ERROR, CERRAR_SESION } from '../../types';

const AuthState = props =>{
    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuarioAuth: null,
        role:null,
        mensaje: null,
        cargando: true
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const iniciarSesion = async data =>{
        try {
            const response = await Axios.post('auth/login', data);
            console.log('auth response ',response);

            if(response.data.userDB){
                localStorage.setItem('user', JSON.stringify(response.data.userDB));
                dispatch({
                    type: LOGIN_EXITOSO,
                    payload: response.data
                });
            }else {
                if(!response.ok){
                    throw new Error('Credenciales incorrectas');
                }    
            }

        } catch (error) {
            console.error('error login ',error);

            const alerta = {
                msg: 'ERROR DE AUTENTICACION',
                tipoAlerta: 'alert-danger alert-dismissible fade show'
            }

            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            })
        }
    }

    const cerrarSesion = () =>{
        dispatch({
            type: CERRAR_SESION
        })
    }

    return(
        <AuthContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuarioAuth: state.usuarioAuth,
                role: state.role,
                cargando: state.cargando,
                mensaje: state.mensaje,
                iniciarSesion,
                cerrarSesion
            }}
        >
            {props.children}

        </AuthContext.Provider>
    )
}

export default AuthState;
