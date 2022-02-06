import React, { useEffect, useContext} from 'react';

// Context de autenticacion
import authContext from "../../context/autenticacion/authContex";

//Icons
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai';

//Context mobile
import mobileContext from '../../context/menuMobile/mobileContext';

const Barra = () => {

    //Extraer la informacion de la autenticacion
    const AuthContext = useContext(authContext);
    const { usuario, usuarioAutenticado, cerrarSesion} = AuthContext;

    //Extraer el context de mobile
    const MobileContext = useContext(mobileContext);
    const {menuMobile, mostrarMenu, ocultarMenu} = MobileContext;

    useEffect(() => {
        usuarioAutenticado();
        //eslint-disable-next-line
    }, []);


    return (

        <header className="app-header">

            {!menuMobile ? <AiOutlineMenu className='icon-menu-mobile' onClick={() => mostrarMenu()}/> : <AiOutlineClose className='icon-menu-mobile' onClick={() => ocultarMenu()} />}

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