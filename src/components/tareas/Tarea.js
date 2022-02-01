import React, {useContext} from 'react';

//Contexts
import tareaContext from '../../context/tareas/tareaContext';
import proyectoContext from '../../context/proyectos/proyectoContext';

const Tarea = ({tarea}) => {

    //Obtener la funcion el context de tarea
    const tareasContext = useContext(tareaContext);
    const { eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual } = tareasContext;

    //Extraer si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext);
    const {proyecto} = proyectosContext;

    //Array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;

    // Funcion que se ejecuta cuando el usuario presiona el btn de eliminar tarea
    const tareaEliminar = (id) => {

        eliminarTarea(id, proyectoActual._id);
        obtenerTareas(proyectoActual.id);
    }

    //Funcion que modifica 
    const cambiarEstado = tarea => {

        tarea.estado = (tarea.estado)?false:true;

        actualizarTarea(tarea);

    }

    //Agrega una tarea actual cuando el usuario desea editarla
    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea);
    }

    return(
        <li className='tarea'>
            <p>{tarea.nombre}</p>

            <div className='estado'>
                {tarea.estado 
                ? 
                    (<button
                        type='button'
                        className='completo'
                        onClick={() => cambiarEstado(tarea)}
                    >
                        Completo
                    </button>)
                :
                (<button
                    type='button'
                    className='incompleto'
                    onClick={() => cambiarEstado(tarea)}
                >
                    Incompleto
                </button>)
            
                }
            </div>

            <div className='acciones'>
                <button
                type='button'
                className='btn-atrea'
                onClick={() => seleccionarTarea(tarea)}
                >Editar</button>

                <button
                type='button'
                className='btn-atrea'
                onClick={() => tareaEliminar(tarea._id)}
                >Eliminar</button>
            </div>
        </li>
    )
}

export default Tarea;