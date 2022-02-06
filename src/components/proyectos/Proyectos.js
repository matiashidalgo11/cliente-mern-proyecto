import React, {useContext, useEffect} from "react";


//Components
import Sidebar from "../layout/Sidebar";
import Barra from "../layout/Barra";
import FormTarea from "../tareas/FormTarea";
import ListadoTareas from "../tareas/ListadoTareas";

// Context de autenticacion
import authContext from "../../context/autenticacion/authContex";

const Proyectos = () => {

    //Extraer la informacion de la autenticacion
    const AuthContext = useContext(authContext);
    const {usuarioAutenticado} = AuthContext;


    useEffect(() => {
        usuarioAutenticado();
        //eslint-disable-next-line
    }, []);


    return(

        <div className="contenedor-app">

            <Sidebar/>

            <div className="seccion-main">

                <Barra/>

                <main className="container-main">

                    <FormTarea/>

                    <div className="contenedor-tareas">

                        <ListadoTareas/>

                    </div>

                </main>

            </div>

        </div>
    )
}

export default Proyectos;