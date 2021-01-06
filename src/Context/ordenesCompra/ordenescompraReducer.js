import {
    LISTAR_ORDENES_COMPRA,
    PRODUCTOS_ORDEN_COMPRA,
    AGREGAR_ORDEN_COMPRA,
    VALIDAR_ORDEN_COMPRA,
    ACTUAL_ORDEN_COMPRA,
    ELIMINAR_ORDEN_COMPRA,
    LIMPIAR_ORDEN_COMPRA_SELECCIONADA,
    AGREGAR_PRODUCTO_ORDEN_COMPRA,
    VALIDAR_PRODUCTO_ORDEN_COMPRA
} from '../../types';

export default (state, action) => {
    switch(action.type){
        case LISTAR_ORDENES_COMPRA:
            return {
                ...state,
                ordenescompras: action.payload
            }
        case PRODUCTOS_ORDEN_COMPRA:
            
            return {
                ...state,
                productosordencompra: action.payload
            }
        case AGREGAR_ORDEN_COMPRA:
            return {
                ...state,
                ordenescompras: [...state.ordenescompras, action.payload],
                errorordenescompra: false,
            }
        case AGREGAR_PRODUCTO_ORDEN_COMPRA:
            return {
                ...state,
                productosordencompra: [...state.productosordencompra, action.payload],
                errorproductoordencompra: false
            }
        case VALIDAR_PRODUCTO_ORDEN_COMPRA:
            return {
                ...state,
                errorproductoordencompra:true
            }    
        case VALIDAR_ORDEN_COMPRA:
            return {
                ...state,
                errorordenescompra:true
            }
        
        case ACTUAL_ORDEN_COMPRA:
            return {
                ...state,
                ordencompraseleccionada: action.payload
            }
                
        case LIMPIAR_ORDEN_COMPRA_SELECCIONADA:
            return {
                ...state,
                ordencompraseleccionada: null
            }
        case ELIMINAR_ORDEN_COMPRA:
            return {
                ...state,
                ordenescompras: state.ordenescompras.filter(ordencompra => ordencompra._id !== action.payload)
            }

        default:
            return state;
    }
}