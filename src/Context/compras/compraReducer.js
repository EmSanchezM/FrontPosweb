import {
    LISTAR_COMPRAS,
    LISTAR_PRODUCTOS_COMPRA,
    AGREGAR_COMPRA,
    AGREGAR_PRODUCTO_COMPRA, 
    VALIDAR_COMPRA,
    ACTUALIZAR_COMPRA,
    ACTUAL_COMPRA,
    ELIMINAR_COMPRA,
    ELIMINAR_PRODUCTO_COMPRA,
    LIMPIAR_COMPRA_SELECCIONADA,
    ULTIMO_CODIGO_COMPRA
} from '../../types';

export default (state, action) => {
    switch(action.type){
        case LISTAR_COMPRAS:
            return {
                ...state,
                compras: action.payload
            }

        case LISTAR_PRODUCTOS_COMPRA:
            return {
                ...state,
                productoscompra: action.payload
            }

        case AGREGAR_COMPRA:
            return {
                ...state,
                compras: [...state.compras, action.payload],
                errorcompra: false,
            }
        
        case AGREGAR_PRODUCTO_COMPRA:
            return {
                ...state,
                productoscompra: [...state.productoscompra, action.payload]
            }

        case VALIDAR_COMPRA:
            return {
                ...state,
                errorcompra:true
            }    
        
        case ACTUALIZAR_COMPRA:
            return {
                ...state,
                compra: state.compras.map(compra=>compra._id === action.payload._id ? action.payload : compra)
            }

        case ACTUAL_COMPRA:
            return {
                ...state,
                compraseleccionada: action.payload
            }
                
        case LIMPIAR_COMPRA_SELECCIONADA:
            return {
                ...state,
                compraseleccionada: null
            }
        case ELIMINAR_COMPRA:
            return {
                ...state,
                compras: state.compras.filter(compra => compra._id !== action.payload)
            }

        case ELIMINAR_PRODUCTO_COMPRA:
            return {
                ...state,
                productoscompra: state.productoscompra.filter(productocompra => productocompra._id !== action.payload)
            }
            
        case ULTIMO_CODIGO_COMPRA:
            return {
                ...state,
                lastcode: action.payload
            }
            
        default:
            return state;
    }
}