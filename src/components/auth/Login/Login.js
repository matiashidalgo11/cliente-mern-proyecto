import React, { useState, useContext, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import alertaContext from '../../../context/alertas/alertaContext';
import authContext from '../../../context/autenticacion/authContex';

//Style
import '../Auth.css';

//Icons
import {FaUserAlt} from 'react-icons/fa';
import {FaLock} from 'react-icons/fa';


function Login() {

    let navigate = useNavigate();

    //Extraer los valores del context
    const AlertaContext = useContext(alertaContext);
    const { alerta, mostrarAlerta } = AlertaContext;

    //Extraer valores del auth context
    const AuthContext = useContext(authContext);
    const { iniciarSesion, mensaje, autenticado } = AuthContext;

    // En caso de que el usuario se haya autenticado o registrado, o sea un registro duplicado
    useEffect( () => {

        if(autenticado){
            navigate('/proyectos');
        }

        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

        //eslint-disable-next-line
    },[mensaje, autenticado]);

    // State para iniciar sesion
    const [usuario, setUsuario] = useState({email:"", password: ""})

    const {email, password} = usuario;

    const onChange = (e) => {

        setUsuario({ ...usuario, [e.target.name]:e.target.value })

    }

    const onSubmit = (e) => {
        e.preventDefault()
        
        //Valida que no haya campos vacios
        if(email.trim() === '' || password.trim() === '') {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
        }else{

             // Pasarlo al action
            iniciarSesion({email, password});
        }


    }

    return ( 
        <div className="form-auth">
            
            {alerta ? (<div className='error-form'> {alerta.msg} </div> ) : null }

            <div className="form-container">
                
                <h1>Iniciar Sesion</h1>

                    <form onSubmit={onSubmit}>
                        
                        <div className="camp-form">
                            <FaUserAlt className='icon-auth'/>
                            <input 
                                type="email"
                                id='email'
                                name='email'
                                placeholder='Email'
                                value={email}
                                onChange={onChange}
                            />
                        </div>

                        <div className="camp-form">
                            <FaLock className='icon-auth'/>
                            <input 
                                type="password"
                                id='password'
                                name='password'
                                placeholder='Password'
                                value={password}
                                onChange={onChange}
                            />
                        </div>

                        
                        <button type="submit" className="btn-auth"> Iniciar Sesion </button>
        

                    </form>

                    <Link to={'/nueva-cuenta'} className="link-auth">
                        Obtener Cuenta
                    </Link>

            </div>
        </div>
    );
}

export default Login;