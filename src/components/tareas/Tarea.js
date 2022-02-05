import React, {useContext} from 'react';

//Contexts
import tareaContext from '../../context/tareas/tareaContext';
import proyectoContext from '../../context/proyectos/proyectoContext';

//icons
import {RiDeleteBin6Fill,RiEditBoxLine} from 'react-icons/ri';
import {AiFillCheckCircle, AiFillCloseCircle} from 'react-icons/ai';


const Tarea = ({tarea}) => {

    //Obtener la funcion el context de tarea
    const tareasContext = useContext(tareaContext);
    const { eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual } = tareasContext;

    //Extraer si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext);
    const {proyecto} = proyectosContext;

    //Array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;

    //Convertir las fechas a string
    let inicio = new Date(tarea.creado).toLocaleString().split(' ')[0];
    let final = (tarea.finalizado === null)? '-' :  new Date(tarea.finalizado).toLocaleString().split(' ')[0];

    // Funcion que se ejecuta cuando el usuario presiona el btn de eliminar tarea
    const tareaEliminar = (id) => {

        eliminarTarea(id, proyectoActual._id);
        obtenerTareas(proyectoActual._id);
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

            
            <div className='tarea-primario'>
                <p className='nombre-tarea'>{tarea.nombre}</p>

                <div className='funcionalidad-tarea'>
                    <div className='estado'>
                        {tarea.estado 
                        ? 
                            (<button
                                type='button'
                                className='completo'
                                onClick={() => cambiarEstado(tarea)}
                            >
                                <AiFillCheckCircle/>
                                <p className='estado-text'>Completo</p>
                            </button>)
                        :
                            (<button
                                type='button'
                                className='incompleto'
                                onClick={() => cambiarEstado(tarea)}
                            >
                                <AiFillCloseCircle/>
                                <p className='estado-text'>Incompleto</p>
                            </button>)
                    
                        }
                    </div>

                    <div className='acciones'>
                        <button
                        type='button'
                        className='btn-tarea edit-tarea'
                        onClick={() => seleccionarTarea(tarea)}
                        >
                            <RiEditBoxLine/>
                        </button>

                        <button
                        type='button'
                        className='btn-tarea eliminar-tarea'
                        onClick={() => tareaEliminar(tarea._id)}
                        >
                            <RiDeleteBin6Fill/>
                        </button>
                    </div>

                </div>

            </div>   

            <div className='fechas'>
                        <p className='fecha-inicio'>Inicio: {inicio}</p>
                        <p className='fecha-finalizado'>Final: {final}</p>
            </div>
            
        </li>
    )
}

export default Tarea;