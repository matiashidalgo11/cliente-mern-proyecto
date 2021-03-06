import React, {Fragment, useContext} from 'react';


//Contexts
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from '../../context/tareas/tareaContext';

//components
import Tarea from './Tarea';

const ListadoTareas = () => {

    //Extraer proyectos de state inicial
    const proyectosContext = useContext(proyectoContext);
    const {proyecto, eliminarProyecto} = proyectosContext;

    //Obtener las tareas del proyecto
    const tareasContext = useContext(tareaContext);
    const {tareasProyecto} = tareasContext;

    //Si no hay proyecto seleccionado
    if(!proyecto) return <h2>Selecciona un Proyecto</h2>

    //Array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;


    //Eliminar un proyecto
    const onClickEliminar = () => {
        eliminarProyecto(proyectoActual._id);
    }

    return(

        <Fragment>

            <h2 className='nombre-proyecto'>{proyectoActual.nombre}</h2>

            <ul className='listado-tareas'>
                {tareasProyecto.length === 0
                    ? (<p>Actualmente no hay tareas</p>)
                    :  tareasProyecto.map(tarea => (<Tarea key={tarea._id} classNames='tarea' tarea={tarea} /> ))

                }
            </ul>

            <button type='button' className='btn-eliminar-proyecto' onClick={onClickEliminar}>Eliminar Proyecto &times;</button>
            
        </Fragment> 
    )
}

export default ListadoTareas;