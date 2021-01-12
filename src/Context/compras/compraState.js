import React, {useReducer} from 'react';

import compraContext from './compraContext';
import compraReducer from './compraReducer';

import {
    LISTAR_COMPRAS,
    AGREGAR_COMPRA,
    VALIDAR_COMPRA,
    ACTUALIZAR_COMPRA,
    ACTUAL_COMPRA,
    ELIMINAR_COMPRA,
    LIMPIAR_COMPRA_SELECCIONADA,
    ULTIMO_CODIGO_COMPRA
} from '../../types';

import Axios from '../../config/axios';

const CompraState = props => {
    const initalState = {
        compras: [],
        errorcompra: false,
        compraseleccionada: null,
        lastcode: null
    }

    const [state, dispatch] = useReducer(compraReducer, initalState);

    const obtenerCompras = async () => {
        try {
            const response = await Axios.get('purchases');
            console.log('obteniendo Compras ',response);
            dispatch({
                type: LISTAR_COMPRAS,
                payload: response.data.compras
            })
            
        } catch (error) {
            console.log(error);
        }
    }

    const getCompraLastCode = async () => {
        try {
            const response = await Axios.post('purchases/lastcode');
            dispatch({
                type: ULTIMO_CODIGO_COMPRA,
                payload: response.data.lastCode
            })
        } catch (error) {
            console.log(error);    
        }
    }
 
    const agregarCompra = async compra => {
        console.log(compra);
        try {
            const response = await Axios.post('purchases', compra);
            console.log('response ', response);
            if(response.ok){
                dispatch({
                    type: AGREGAR_COMPRA,
                    payload: compra
                })
            }
            
        } catch (error) {
            console.log(error);
            dispatch({
                type: VALIDAR_COMPRA
            })
        }
    }

    const actualizarCompra = async compra => {
        //console.log('compra a actualizar ', compra)
        try {
            const response = await Axios.put(`purchases/update/${compra._id}`, compra);
            //console.log(response);
            if(response.ok){
                dispatch({
                    type: ACTUALIZAR_COMPRA,
                    payload: response.data.compraActualizada
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    const eliminarCompra = async compra => {
        
        try {
            await Axios.delete(`purchases/delete/${compra._id}`);
            dispatch({
                type: ELIMINAR_COMPRA,
                payload: compra._id
            })
        } catch (error) {
            console.log(error);
        }
    }

    const validarCompra = () =>{
        dispatch({
            type: VALIDAR_COMPRA
        })
    }

    const guardarCompraActual = compra => {
        dispatch({
            type: ACTUAL_COMPRA,
            payload: compra
        })
    }

    const limpiarCompraSeleccionada = () =>{
        dispatch({
            type: LIMPIAR_COMPRA_SELECCIONADA
        })
    }

    return(
        <compraContext.Provider
            value={{
                compras: state.compras,
                errorcompra: state.errorcompra,
                compraseleccionada: state.compraseleccionada,
                lastcode: state.lastcode,
                obtenerCompras,
                getCompraLastCode,
                agregarCompra,
                actualizarCompra,
                eliminarCompra,
                validarCompra,
                guardarCompraActual,
                limpiarCompraSeleccionada,
            }}
        >
            {props.children}
        </compraContext.Provider>
    )
}

export default CompraState;