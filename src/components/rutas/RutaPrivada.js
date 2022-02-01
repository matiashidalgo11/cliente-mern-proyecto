import React, {useContext, useEffect} from "react";
import { Navigate, Outlet } from "react-router-dom";
import authContext from "../../context/autenticacion/authContex";

const RutaPrivada = () => {
    
    const AuthContext = useContext(authContext);
    const { autenticado, cargando, usuarioAutenticado } = AuthContext; 

    useEffect(() =>{
        usuarioAutenticado();

        //eslint-disable-next-line
    },[])

    return ( 
        !autenticado && !cargando ? <Navigate to="/"/> : <Outlet/> 
    );
}

export default RutaPrivada;