import React, { useReducer } from "react";

import {v4 as uuid} from 'uuid';

import proyectoContext from "./proyectoContext";
import proyectoReducer from "./proyectoReducer";

import {
        FORMULARIO_PROYECTO,
        OBTENER_PROYECTOS,
        AGREGAR_PROYECTOS,
        PROYECTO_ERROR,
        VALIDAR_FORMULARIO,
        PROYECTO_ACTUAL,
        ELIMINAR_PROYECTO,
        
} from '../../types';

//Axios
import clienteAxios from "../../config/axios";

const ProyectoState = props => {

    const initialState = {
        proyectos : [],
        formulario : false,
        errorformulario: false,
        proyecto: null,
        mensaje: null
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(proyectoReducer,initialState);

    //Serie de funciones para el CRUD
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    //Obtener proyectos
    const obtenerProyectos = async () => {
        try {

            const resultado = await clienteAxios.get('/api/proyectos');

            dispatch({
                type: OBTENER_PROYECTOS,
                payload: resultado.data.proyectos
            })

        } catch (error) {
            console.log(error);
        }
    }

    //Agregar Nuevo proyecto
    const agregarProyecto = async proyecto => {

        try{

            const resultado = await clienteAxios.post('/api/proyectos', proyecto);
            console.log(resultado);

            //Insertar el proyecto al state
            dispatch({
                type:AGREGAR_PROYECTOS,
                payload: resultado.data
            });

        } catch (error) {

            console.log(error);

        }

        
    }

    //Valida el formulario por errores
    const mostrarError = () => {
        dispatch({
            type:VALIDAR_FORMULARIO
        })
    }

    //Selecciona el Proyecto que el usuario dio click
    const proyectoActual = (proyectoId) => {
        dispatch({
            type:PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }

    //Elimina un proyecto
    const eliminarProyecto = async proyectoId => {
        try{

            await clienteAxios.delete(`/api/proyectos/${proyectoId}`);

            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId
            });
    

        } catch (error) {

            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })

        }
    }

    return (
        <proyectoContext.Provider
            value={{
                proyectos : state.proyectos,
                formulario: state.formulario,
                errorformulario: state.errorformulario,
                proyecto:state.proyecto,
                mensaje: state.mensaje,
                obtenerProyectos,
                mostrarFormulario,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )
}

export default ProyectoState;