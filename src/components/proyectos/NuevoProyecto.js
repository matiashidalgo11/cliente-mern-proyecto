import React, { useState, Fragment, useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";

//Icons
import {GiCancel} from 'react-icons/gi';

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

    const cancelarForm = () => {
        mostrarFormulario();
        setProyecto({nombre: ''});
    }

    return(

        <Fragment>
            

            {
                formulario
                ?
                    (<form className="form-nuevo-proyecto" onSubmit={onSubmitProyecto}>
                    
                    <GiCancel className="icon-cancel-proyecto" onClick={cancelarForm}/>
                    <input 
                    type="text" 
                    className="input-agregar"
                    placeholder="Nombre Proyecto" 
                    name="nombre"
                    value={nombre}
                    onChange={onChangeProyecto}
                    />
    
                    <input type="submit" className="btn btn-nuevo-proyecto" value="Agregar proyecto"/>
    
                </form>)

                :
                <button
                type="button"
                className="btn btn-nuevo-proyecto"
                onClick={onClickFormulario}
                >
                Nuevo Proyecto
                </button>

            }

            {errorformulario? <p className="error-proyecto">El nombre del proyecto es obligatorio</p> : null}

        </Fragment>
    )
}

export default NuevoProyecto;