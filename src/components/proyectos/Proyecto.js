import React, {useContext} from 'react';

//Contexts
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';



const Proyecto = ({proyectoData}) => {


    //Obtener el state de proyectos
    const proyectosContext = useContext(proyectoContext);
    const {proyectoActual, proyecto} = proyectosContext;

    //Obtener la funcion el contxt de tarea
    const tareasContext = useContext(tareaContext);
    const {obtenerTareas} = tareasContext;

    //Funcion para agregar el proyecto actual
    const seleccionarProyecto = id => {

        proyectoActual(id); //Fijar un proyecto actual
        obtenerTareas(id); //Filtrar las tareas cuando se de click
    }

    return(

        <li className="item-proyecto">
            <button
                type='button'
                className= {`btn-proyecto ${(proyecto !== null && proyecto[0]._id === proyectoData._id)?' proyecto-activo ' : ''}`}
                onClick={() => seleccionarProyecto(proyectoData._id)}
            >
                {proyectoData.nombre}
            </button>
        </li>
    )
}

export default Proyecto;