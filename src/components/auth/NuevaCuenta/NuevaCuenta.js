import React, { useState, useContext, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import alertaContext from '../../../context/alertas/alertaContext';
import authContext from '../../../context/autenticacion/authContex';

//Style
import '../Auth.css';

//Icons
import {BiRepeat} from 'react-icons/bi'; //confirm
import {FaUserTie} from 'react-icons/fa'; //name
import {RiLockPasswordFill} from 'react-icons/ri'; //pass
import {MdAlternateEmail} from 'react-icons/md' //email


const NuevaCuenta = (props) => {
    
    let navigate = useNavigate();

    //Extraer los valores del context
    const AlertaContext = useContext(alertaContext);
    const { alerta, mostrarAlerta } = AlertaContext;

    //Extraer valores del auth context
    const AuthContext = useContext(authContext);
    const { registrarUsuario, mensaje, autenticado } = AuthContext;

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

    //State para iniciar sesion
    const [usuario, setUsuario] = useState({nombre:"",  email:"", password:"", confirm:""});

    //Extraemos del Usuario
    const {nombre, email, password, confirm} = usuario;

    const onChange = (e) => {
        setUsuario({...usuario, [e.target.name] : e.target.value})
    }

    const onSubmit = (e) => {
        e.preventDefault()
        console.log("submit")

        //validar que no hayan campos vacios
        if(nombre.trim() === ''  || email.trim() === '' || password.trim() === '' || confirm.trim() === '' ){
            mostrarAlerta('Todos los campos son obligarios', 'alerta-error');
            return;
;        }

        //password minimo 6 caracteres
        if(password.length < 6){
            mostrarAlerta('El password debe ser del al menos 6 caracteres', 'alerta-error');
            return;
        }

        //los dos password iguales
        if(password !== confirm){
            mostrarAlerta('Los password no coinciden', 'alerta-error');
            return;
        }

        //pasarlo al action
        registrarUsuario({
            nombre,
            email,
            password
        });

    }

    return ( 
        <div className='form-auth'>

            {alerta ? (<div className='error-form'> {alerta.msg} </div> ) : null }
            
        <div className='form-container'>
            
            <h1>Nueva Cuenta</h1>

                <form onSubmit={onSubmit}>

                    <div className='camp-form'>
                        <FaUserTie className='icon-auth'/>
                        <input 
                            type="name"
                            id='name'
                            name='nombre'
                            placeholder='Nombre'
                            value={nombre}
                            onChange={onChange}
                        />
                    </div>
                    
                    <div className='camp-form'>
                        <MdAlternateEmail className='icon-auth'/>
                        <input 
                            type="email"
                            id='email'
                            name='email'
                            placeholder='Email'
                            value={email}
                            onChange={onChange}
                        />
                    </div>

                    <div className='camp-form'>
                        <RiLockPasswordFill className='icon-auth'/>
                        <input 
                            type="password"
                            id='password'
                            name='password'
                            placeholder='Password'
                            value={password}
                            onChange={onChange}
                        />
                    </div>

                    <div className='camp-form'>
                        <BiRepeat className='icon-auth'/>
                        <input 
                            type="password"
                            id='confirm'
                            name='confirm'
                            placeholder='Repeat Password'
                            value={confirm}
                            onChange={onChange}
                        />
                    </div>


                    <button type="submit" className="btn-auth"> Registrarse </button>


                </form>

                <Link to={'/'} className="link-auth">
                    Ya tienes cuenta? Click aqui.
                </Link>

        </div>
    </div>
    );
}

export default NuevaCuenta;