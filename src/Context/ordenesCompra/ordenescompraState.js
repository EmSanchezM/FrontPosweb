import React, {useReducer} from 'react';

import ordenesCompraContext from './ordenescompraContext';
import ordenescompraReducer from './ordenescompraReducer';

import {
    LISTAR_ORDENES_COMPRA,
    AGREGAR_ORDEN_COMPRA,
    VALIDAR_ORDEN_COMPRA,
    ACTUAL_ORDEN_COMPRA,
    ELIMINAR_ORDEN_COMPRA,
    LIMPIAR_ORDEN_COMPRA_SELECCIONADA,
    PRODUCTOS_ORDEN_COMPRA,
    AGREGAR_PRODUCTO_ORDEN_COMPRA
} from '../../types';

import Axios from '../../config/axios';

const OrdenCompraState = props => {
    const initalState = {
        ordenescompras: [],
        errorordencompra: false,
        ordencompraseleccionada: null,
        productosordencompra: [],
        errorproductoordencompra: false
    }

    const [state, dispatch] = useReducer(ordenescompraReducer, initalState);

    const obtenerOrdenesCompras = async () => {
        try {
            const response = await Axios.get('purchases_orders');
            console.log('obteniendo Ordenes de Compras ',response);
            dispatch({
                type: LISTAR_ORDENES_COMPRA,
                payload: response.data.ordenesCompras
            })
            
        } catch (error) {
            console.log(error);
        }
    }

    const getProductosOrdenCompra = async (ordencompra) => {
        try {
            const response = await Axios.get(`purchase_order_details/${ordencompra._id}`);
            dispatch({
                type: PRODUCTOS_ORDEN_COMPRA,
                payload: response.data.productsDetails
            })
        } catch (error) {
            console.log(error);    
        }
    }
 
    const agregarOrdenCompra = async ordencompra => {
        console.log(ordencompra);
        try {
            const response = await Axios.post('purchases_orders', ordencompra);
            console.log('response ', response);
            if(response.ok){
                dispatch({
                    type: AGREGAR_ORDEN_COMPRA,
                    payload: ordencompra
                })
            }
            
        } catch (error) {
            console.log(error);
            dispatch({
                type: VALIDAR_ORDEN_COMPRA
            })
        }
    }

    const agregarProductoOrdenCompra = async (productoOrdenCompra, idOrdenCompra) => {
        console.log(productoOrdenCompra);
        const { productId, cuantity, cost, tax, discount } = productoOrdenCompra;

        let saveProductoOrden = {
            purchaseOrderId: idOrdenCompra,
            productId,
            cuantity,
            cost,
            tax,
            discount
        }

        try {
            const response = await Axios.post('purchase_order_details', saveProductoOrden);
            console.log('response ', response);
            if(response.ok){
                dispatch({
                    type: AGREGAR_PRODUCTO_ORDEN_COMPRA,
                    payload: productoOrdenCompra
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    const eliminarOrdenCompra = async ordencompra => {
        
        try {
            await Axios.delete(`purchases_orders/delete/${ordencompra._id}`);
            dispatch({
                type: ELIMINAR_ORDEN_COMPRA,
                payload: ordencompra._id
            })
        } catch (error) {
            console.log(error);
        }
    }

    const validarOrdenCompra = () =>{
        dispatch({
            type: VALIDAR_ORDEN_COMPRA
        })
    }

    const guardarOrdenCompraActual = ordencompra => {
        dispatch({
            type: ACTUAL_ORDEN_COMPRA,
            payload: ordencompra
        })
    }

    const limpiarOrdenesCompraseleccionada = () =>{
        dispatch({
            type: LIMPIAR_ORDEN_COMPRA_SELECCIONADA
        })
    }

    return(
        <ordenesCompraContext.Provider
            value={{
                ordenescompras: state.ordenescompras,
                errorordencompra: state.errorordencompra,
                ordencompraseleccionada: state.ordencompraseleccionada,
                productosordencompra: state.productosordencompra,
                errorproductoordencompra: state.errorproductoordencompra,
                obtenerOrdenesCompras,
                getProductosOrdenCompra,
                agregarOrdenCompra,
                agregarProductoOrdenCompra,
                eliminarOrdenCompra,
                validarOrdenCompra,
                guardarOrdenCompraActual,
                limpiarOrdenesCompraseleccionada,
            }}
        >
            {props.children}
        </ordenesCompraContext.Provider>
    )
}

export default OrdenCompraState;