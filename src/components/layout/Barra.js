import React, { useEffect, useContext} from 'react';

// Context de autenticacion
import authContext from "../../context/autenticacion/authContex";

const Barra = () => {

    //Extraer la informacion de la autenticacion
    const AuthContext = useContext(authContext);
    const { usuario, usuarioAutenticado, cerrarSesion} = AuthContext;

    useEffect(() => {
        usuarioAutenticado();
        //eslint-disable-next-line
    }, []);


    return (

        <header className="app-header">

            {usuario ? <p className='nombre-usuario'>Hola <span>{usuario.nombre}</span> </p> : null}
            

            <nav className='nav-principal'>
                <button
                    className='btn btn-cerrar-sesion'
                    onClick={() => cerrarSesion()}
                > Cerrar sesion</button>
            </nav>
        </header>

    )
}

export default Barra;