import React, {useReducer} from 'react';

import bodegaContext from './bodegaContext';
import bodegaReducer from './bodegaReducer';

import {
    LISTAR_BODEGAS,
    AGREGAR_BODEGA,
    VALIDAR_BODEGA,
    ACTUAL_BODEGA,
    ACTUALIZAR_BODEGA,
    ELIMINAR_BODEGA,
    LIMPIAR_BODEGA_SELECCIONADA
} from '../../types';

import Axios from '../../config/axios';

const BodegaState = props => {
    const initalState = {
        bodegas: [],
        errorbodega: false,
        bodegaseleccionada: null
    }

    const [state, dispatch] = useReducer(bodegaReducer, initalState);

    const obtenerBodegas = async () => {
        try {
            const response = await Axios.get('products');
            console.log('obteniendo Bodegas ',response);
            dispatch({
                type: LISTAR_BODEGAS,
                payload: response.data.products
            })
            
        } catch (error) {
            console.log(error);
        }
    }
 
    const agregarBodega = async bodega => {
        //console.log(empleado)
        try {
            const response = await Axios.post('products', bodega);
            //console.log('guardando empleado ',response);
            if(response.ok){
                dispatch({
                    type: AGREGAR_BODEGA,
                    payload: bodega
                })
            }
            
        } catch (error) {
            console.log(error);
            dispatch({
                type: VALIDAR_BODEGA
            })
        }
    }

    const actualizarBodega = async bodega => {
        //console.log('empleado a actualizar ', empleado)
        try {
            const response = await Axios.put(`products/update/${bodega._id}`, bodega);
            //console.log(response);
            if(response.ok){
                dispatch({
                    type: ACTUALIZAR_BODEGA,
                    payload: response.data.bodegaActualizado
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    const eliminarBodega = async bodega => {
        //console.log('empleado a actualizar ', empleado)
        try {
            await Axios.delete(`products/delete/${bodega._id}`);
            dispatch({
                type: ELIMINAR_BODEGA,
                payload: bodega._id
            })
        } catch (error) {
            console.log(error);
        }
    }

    const validarBodega = () =>{
        dispatch({
            type: VALIDAR_BODEGA
        })
    }

    const guardarBodegaActual = bodega => {
        dispatch({
            type: ACTUAL_BODEGA,
            payload: bodega
        })
    }

    const limpiarBodegaSeleccionada = () =>{
        dispatch({
            type: LIMPIAR_BODEGA_SELECCIONADA
        })
    }

    return(
        <bodegaContext.Provider
            value={{
                bodegas: state.bodegas,
                errorbodega: state.errorbodega,
                bodegaseleccionada: state.bodegaseleccionada,
                obtenerBodegas,
                agregarBodega,
                actualizarBodega,
                eliminarBodega,
                validarBodega,
                guardarBodegaActual,
                limpiarBodegaSeleccionada,
            }}
        >
            {props.children}
        </bodegaContext.Provider>
    )
}

export default BodegaState;