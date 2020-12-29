import {
    LISTAR_BODEGAS,
    AGREGAR_BODEGA,
    VALIDAR_BODEGA,
    ACTUAL_BODEGA,
    ACTUALIZAR_BODEGA,
    ELIMINAR_BODEGA,
    LIMPIAR_BODEGA_SELECCIONADA
} from '../../types';

export default (state, action) => {
    switch(action.type){
        case LISTAR_BODEGAS:
            return {
                ...state,
                bodegas: action.payload
            }
        case AGREGAR_BODEGA:
            return {
                ...state,
                bodegas: [...state.bodegas, action.payload],
                errorbodega: false,
            }
        case VALIDAR_BODEGA:
            return {
                ...state,
                errorbodega:true
            }
        
        case ACTUAL_BODEGA:
            return {
                ...state,
                bodegaseleccionada: action.payload
            }
        
        case ACTUALIZAR_BODEGA:
            return {
                ...state,
                bodega: state.bodegas.map(bodega=>bodega._id === action.payload._id ? action.payload : bodega)
            }
        
        case LIMPIAR_BODEGA_SELECCIONADA:
            return {
                ...state,
                bodegaseleccionada: null
            }
        case ELIMINAR_BODEGA:
            return {
                ...state,
                bodegas: state.bodegas.filter(bodega => bodega._id !== action.payload)
            }

        default:
            return state;
    }
}