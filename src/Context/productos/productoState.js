import React, {useReducer} from 'react';

import productoContext from './productoContext';
import productoReducer from './productoReducer';

import {
    LISTAR_PRODUCTOS,
    AGREGAR_PRODUCTO,
    VALIDAR_PRODUCTO,
    ACTUAL_PRODUCTO,
    SELECT_CATEGORIAS,
    SELECT_PROVEEDORES,
    ACTUALIZAR_PRODUCTO,
    ELIMINAR_PRODUCTO,
    LIMPIAR_PRODUCTO_SELECCIONADO
} from '../../types';

import Axios from '../../config/axios';

const ProductoState = props => {
    const initalState = {
        productos: [],
        categorias: [],
        proveedores: [],
        errorproducto: false,
        productoseleccionado: null
    }

    const [state, dispatch] = useReducer(productoReducer, initalState);

    const obtenerProductos = async () => {
        try {
            const response = await Axios.get('products');
            console.log('obteniendo productos ',response);
            dispatch({
                type: LISTAR_PRODUCTOS,
                payload: response.data.products
            })
            
        } catch (error) {
            console.log(error);
        }
    }

    const obtenerCategorias = async () => {
        try {
            const response = await Axios.get('categories');
            console.log('obteniendo categorias ',response);
            dispatch({
                type: SELECT_CATEGORIAS,
                payload: response.data.categories
            })
            
        } catch (error) {
            console.log(error);
        }
    }

    const obtenerProveedores = async () => {
        try {
            const response = await Axios.get('suppliers');
            //console.log('obteniendo proveedores ',response);
            
            dispatch({
                type: SELECT_PROVEEDORES,
                payload: response.data.suppliers
            })
            
            
        } catch (error) {
            console.log(error);
        }
    }
    
    const agregarProducto = async producto => {
        //console.log(empleado)
        try {
            const response = await Axios.post('products', producto);
            //console.log('guardando empleado ',response);
            if(response.ok){
                dispatch({
                    type: AGREGAR_PRODUCTO,
                    payload: producto
                })
            }
            
        } catch (error) {
            console.log(error);
            dispatch({
                type: VALIDAR_PRODUCTO
            })
        }
    }

    const actualizarProducto = async producto => {
        //console.log('empleado a actualizar ', empleado)
        try {
            const response = await Axios.put(`products/update/${producto._id}`, producto);
            //console.log(response);
            if(response.ok){
                dispatch({
                    type: ACTUALIZAR_PRODUCTO,
                    payload: response.data.productoActualizado
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    const eliminarProducto = async producto => {
        //console.log('empleado a actualizar ', empleado)
        try {
            await Axios.delete(`products/delete/${producto._id}`);
            dispatch({
                type: ELIMINAR_PRODUCTO,
                payload: producto._id
            })
        } catch (error) {
            console.log(error);
        }
    }

    const validarProducto = () =>{
        dispatch({
            type: VALIDAR_PRODUCTO
        })
    }

    const guardarProductoActual = producto => {
        dispatch({
            type: ACTUAL_PRODUCTO,
            payload: producto
        })
    }

    const limpiarProductoSeleccionado = () =>{
        dispatch({
            type: LIMPIAR_PRODUCTO_SELECCIONADO
        })
    }

    return(
        <productoContext.Provider
            value={{
                productos: state.productos,
                errorproducto: state.errorproducto,
                productoseleccionado: state.productoseleccionado,
                obtenerProductos,
                agregarProducto,
                actualizarProducto,
                eliminarProducto,
                validarProducto,
                guardarProductoActual,
                obtenerCategorias,
                obtenerProveedores,
                limpiarProductoSeleccionado,
            }}
        >
            {props.children}
        </productoContext.Provider>
    )
}

export default ProductoState;