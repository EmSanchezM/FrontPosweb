import {
    LISTAR_CATEGORIAS,
    AGREGAR_CATEGORIA,
    VALIDAR_CATEGORIA,
    ACTUAL_CATEGORIA,
    ACTUALIZAR_CATEGORIA,
    ELIMINAR_CATEGORIA,
    LIMPIAR_CATEGORIA_SELECCIONADA
} from '../../types';

export default (state, action) => {
    switch(action.type){
        case LISTAR_CATEGORIAS:
            return {
                ...state,
                categorias: action.payload
            }
        case AGREGAR_CATEGORIA:
            return {
                ...state,
                categorias: [...state.categorias, action.payload],
                errorcategoria: false,
            }
        case VALIDAR_CATEGORIA:
            return {
                ...state,
                errorcategoria:true
            }
        
        case ACTUAL_CATEGORIA:
            return {
                ...state,
                categoriaseleccionada: action.payload
            }
        case ACTUALIZAR_CATEGORIA:
            return {
                ...state,
                categoria: state.categorias.map(categoria=>categoria._id === action.payload._id ? action.payload : categoria)
            }
        
        case LIMPIAR_CATEGORIA_SELECCIONADA:
            return {
                ...state,
                categoriaseleccionada: null
            }
        case ELIMINAR_CATEGORIA:
            return {
                ...state,
                categorias: state.categorias.filter(categoria => categoria._id !== action.payload)
            }

        default:
            return state;
    }
}