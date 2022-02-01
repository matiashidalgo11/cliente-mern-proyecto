import React, { useContext, useEffect } from "react";
import Proyecto from "./Proyecto";

//Context
import proyectoContext from "../../context/proyectos/proyectoContext";
import alertaContext from "../../context/alertas/alertaContext";

const ListadoProyecto = () => {

    //Extraer proyectos de state inicial
    const proyectosContext = useContext(proyectoContext);
    const { mensaje, proyectos, obtenerProyectos} = proyectosContext;

    //Extraer alerta context
    const AlertaContext = useContext(alertaContext);
    const { alerta, mostrarAlerta} = AlertaContext;
    
    useEffect(() => {
        
        //Si hay un error
        if(mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

        obtenerProyectos();
        // eslint-disable-next-line
    }, [mensaje]);

    // revisar si proyectos tiene contenido
    if(proyectos.length === 0) return <p>No hay Proyectos, comienza creando uno</p>;
    
    return(
        <ul className="listado-proyecto">

            {alerta ? (<div className={`alerta ${alerta.categoria}`} > { alerta.msg} </div>) : null}

            {proyectos.map(proyecto => (
            <Proyecto
                key={proyecto._id}
                proyecto={proyecto}
            />
            ))}
        </ul>
    )
}

export default ListadoProyecto;