import React, {useReducer} from 'react';

import categoriaContext from './categoriaContext';
import categoriaReducer from './categoriaReducer';

import {
    LISTAR_CATEGORIAS,
    AGREGAR_CATEGORIA,
    VALIDAR_CATEGORIA,
    ACTUAL_CATEGORIA,
    ACTUALIZAR_CATEGORIA,
    ELIMINAR_CATEGORIA,
    LIMPIAR_CATEGORIA_SELECCIONADA
} from '../../types';

import Axios from '../../config/axios';

const CategoriaState = props => {
    const initalState = {
        categorias: [],
        errorcategoria: false,
        categoriaseleccionada: null
    }

    const [state, dispatch] = useReducer(categoriaReducer, initalState);

    const obtenerCategorias = async () => {
        try {
            const response = await Axios.get('categories');
            console.log('obteniendo categorias ',response);
            dispatch({
                type: LISTAR_CATEGORIAS,
                payload: response.data.categories
            })
            
        } catch (error) {
            console.log(error);
        }
    }
    
    const agregarCategoria = async categoria => {
        //console.log(categoria)
        try {
            const response = await Axios.post('categories', categoria);
            //console.log('guardando categoria ',response);
            if(response.ok){
                dispatch({
                    type: AGREGAR_CATEGORIA,
                    payload: categoria
                })
            }
            
        } catch (error) {
            console.log(error);
            dispatch({
                type: VALIDAR_CATEGORIA
            })
        }
    }

    const actualizarCategoria = async categoria => {
        //console.log('categoria a actualizar ', categoria)
        try {
            const response = await Axios.put(`categories/update/${categoria._id}`, categoria);
            //console.log(response);
            if(response.ok){
                dispatch({
                    type: ACTUALIZAR_CATEGORIA,
                    payload: response.data.categoriaActualizada
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    const eliminarCategoria = async categoria => {
        //console.log('categoria a eliminar ', categoria)
        try {
            await Axios.delete(`categories/delete/${categoria._id}`);
            dispatch({
                type: ELIMINAR_CATEGORIA,
                payload: categoria._id
            })
        } catch (error) {
            console.log(error);
        }
    }

    const validarCategoria = () =>{
        dispatch({
            type: VALIDAR_CATEGORIA
        })
    }

    const guardarCategoriaActual = categoria => {
        dispatch({
            type: ACTUAL_CATEGORIA,
            payload: categoria
        })
    }

    const limpiarCategoriaSeleccionada = () =>{
        dispatch({
            type: LIMPIAR_CATEGORIA_SELECCIONADA
        })
    }

    return(
        <categoriaContext.Provider
            value={{
                categorias: state.categorias,
                errorcategoria: state.errorcategoria,
                categoriaseleccionada: state.categoriaseleccionada,
                obtenerCategorias,
                agregarCategoria,
                actualizarCategoria,
                eliminarCategoria,
                validarCategoria,
                guardarCategoriaActual,
                limpiarCategoriaSeleccionada
            }}
        >
            {props.children}
        </categoriaContext.Provider>
    )
}

export default CategoriaState;