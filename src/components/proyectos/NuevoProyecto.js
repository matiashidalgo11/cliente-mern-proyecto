import React, { useState, Fragment, useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";


const NuevoProyecto = () => {

    //Obtener el state del formulario
    const proyectosContext = useContext(proyectoContext);
    const {formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError} = proyectosContext;
    
    //State para Proyecto
    const [proyecto, setProyecto] = useState({
        nombre:''
    });

    //Estraer nombre de proyecto
    const {nombre} = proyecto;

    //Lee los contenidos del input y los setea en proyecto
    const onChangeProyecto = (e) => {

        setProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        })
    }

    //Cuando el usuario
    const onSubmitProyecto = (e) => {
        e.preventDefault();

        //validar el proyecto
        if(nombre === '') {
            
            mostrarError();
            return;
        }

        // agregar al state
        agregarProyecto(proyecto);

        //reiniciar el form


    }

    //Mostrar Formulario

    const onClickFormulario = () => {
        mostrarFormulario();
    }

    return(

        <Fragment>
            <button
                type="button"
                className="btn nuevo-proyecto"
                onClick={onClickFormulario}
            >
                Nuevo Proyecto
            </button>

            {
                formulario
                ?
                    (<form className="form-nuevo-proyecto" onSubmit={onSubmitProyecto}>

                    <input 
                    type="text" 
                    className=""
                    placeholder="Nombre Proyecto" 
                    name="nombre"
                    value={nombre}
                    onChange={onChangeProyecto}
                    />
    
                    <input type="submit" className="btn submit" value="Agregar proyecto"/>
    
                </form>)

                :
                    null
            }

            {errorformulario? <p className="mensaje error">El nombre del proyecto es obligatorio</p> : null}

        </Fragment>
    )
}

export default NuevoProyecto;