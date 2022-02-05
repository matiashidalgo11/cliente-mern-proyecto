import React, {useContext, useState, useEffect} from 'react';

//Contexts
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

    //Extraer si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext);
    const {proyecto} = proyectosContext;

    //Obtener la funcion el context de tarea
    const tareasContext = useContext(tareaContext);
    const { tareaSeleccionada, agregarTarea, validarTarea, errorTarea, obtenerTareas, actualizarTarea, limpiarTarea } = tareasContext;

    // Effect que detecta si hay una tarea seleccionada
    useEffect(() =>{

        if(tareaSeleccionada !== null){
            guardarTarea(tareaSeleccionada)
        } else {
            guardarTarea({
                nombre:''
            })
        }


    }, [tareaSeleccionada]);

    //State del formulario
    const[tarea, guardarTarea] = useState({
        nombre: ''
    });

    //Extraer el nombre del proyecto
    const {nombre} = tarea;
    
    //Si no hay proyecto seleccionado
    if(!proyecto) return null;

    //Array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;

    // Leer los valores del formulario
    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    //Submit para agregar tarea
    const onSubmit = (e) => {
        e.preventDefault();

        //validar
        if(nombre.trim() === ''){
            validarTarea();
            return;
        }

        //Si es edicion o si es nueva tarea
        if(tareaSeleccionada === null){

            //tarea nueva
            //agregar la nueva tarea al state de tareas
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);

        } else {

            //actualizar tarea existente
            actualizarTarea(tarea);

            //Elimina la tareaSeleccionada del state
            limpiarTarea();
        }


        //Obtener y filtrar las tareas del proyecto actual
        obtenerTareas(proyectoActual._id);

        //reiniciar el form
        guardarTarea({
            nombre:''
        })
    }

    return(

        <div className='formulario-tarea'>
            <form
                onSubmit={onSubmit}
            >
                <div className='contenedor-input-form'>
                    <input 
                        type="text"
                        className='input-tarea'
                        placeholder='Nombre Tarea...'
                        name='nombre'
                        value={nombre}
                        onChange={handleChange}
                        />
                </div>

                <div className='contenedor-input-form'>

                    <input 
                        type="submit"
                        className='btn btn-agregar-tarea'
                        placeholder='Nombre Tarea...'
                        value={tareaSeleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
                    />

                </div>

            </form>

            {errorTarea ? <p className='error-tarea'>El nombre de la tarea es obligatorio</p> : null}
        </div>
    )
}

export default FormTarea;