import {FORMULARIO_PROYECTO,
        OBTENER_PROYECTOS,
        AGREGAR_PROYECTOS,
        PROYECTO_ERROR,
        VALIDAR_FORMULARIO,
        PROYECTO_ACTUAL,
        ELIMINAR_PROYECTO

} from '../../types';

const proyectoReducer = (state, action) => {

    switch(action.type){

        case FORMULARIO_PROYECTO:
            let form = state.formulario;
            return{
                ...state, 
                formulario: form?false:true,
                errorformulario: false
            }
        
        case OBTENER_PROYECTOS:
            return{
                ...state, 
                proyectos : action.payload,
                proyecto: null
            }
        
        case AGREGAR_PROYECTOS:
            return{
                ...state, 
                proyectos : [...state.proyectos, action.payload],
                formulario: false,
                errorformulario: false
            }

        case VALIDAR_FORMULARIO:
            return{
                ...state, 
                errorformulario: true
            }
        
        case PROYECTO_ACTUAL:
            return{
                ...state, 
                proyecto: state.proyectos.filter(proyecto => proyecto._id === action.payload)
            }

        case ELIMINAR_PROYECTO:
            return{
                ...state, 
                proyectos: state.proyectos.filter(proyecto => proyecto._id !== action.payload),
                proyecto: null
            }
        
        case PROYECTO_ERROR:
            return {
                ...state,
                mensaje: action.payload.msg
            }

        default:
            return state;

    }
}

export default proyectoReducer;