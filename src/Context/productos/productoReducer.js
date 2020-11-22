import {
    LISTAR_PRODUCTOS,
    AGREGAR_PRODUCTO,
    VALIDAR_PRODUCTO,
    ACTUAL_PRODUCTO,
    ACTUALIZAR_PRODUCTO,
    ELIMINAR_PRODUCTO,
    LIMPIAR_PRODUCTO_SELECCIONADO
} from '../../types';

export default (state, action) => {
    switch(action.type){
        case LISTAR_PRODUCTOS:
            return {
                ...state,
                productos: action.payload
            }
        case AGREGAR_PRODUCTO:
            return {
                ...state,
                productos: [...state.productos, action.payload],
                errorproducto: false,
            }
        case VALIDAR_PRODUCTO:
            return {
                ...state,
                errorproducto:true
            }
        
        case ACTUAL_PRODUCTO:
            return {
                ...state,
                productoseleccionado: action.payload
            }
        case ACTUALIZAR_PRODUCTO:
            return {
                ...state,
                producto: state.productos.map(producto=>producto._id === action.payload._id ? action.payload : producto)
            }
        
        case LIMPIAR_PRODUCTO_SELECCIONADO:
            return {
                ...state,
                productoseleccionado: null
            }
        case ELIMINAR_PRODUCTO:
            return {
                ...state,
                productos: state.productos.filter(producto => producto._id !== action.payload)
            }

        default:
            return state;
    }
}