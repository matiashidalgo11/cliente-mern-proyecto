import React, { useState, useContext, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import alertaContext from '../../../context/alertas/alertaContext';
import authContext from '../../../context/autenticacion/authContex';

//Style
import style from './NuevaCuenta.module.css';


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
        <div className={style.FormRegistro}>

            {alerta ? (<div> {alerta.msg} </div> ) : null }
            
        <div className={style.ContainerForm}>
            
            <h1>Nueva Cuenta</h1>

                <form onSubmit={onSubmit}>

                    <div className={style.CampoForm}>
                        <label htmlFor='name'>Nombre</label>
                        <input 
                            type="name"
                            id='name'
                            name='nombre'
                            placeholder='Tu Nombre'
                            value={nombre}
                            onChange={onChange}
                        />
                    </div>
                    
                    <div className={style.CampoForm}>
                        <label htmlFor='email'>Email</label>
                        <input 
                            type="email"
                            id='email'
                            name='email'
                            placeholder='Tu Email'
                            value={email}
                            onChange={onChange}
                        />
                    </div>

                    <div className={style.CampoForm}>
                        <label htmlFor='password'>Password</label>
                        <input 
                            type="password"
                            id='password'
                            name='password'
                            placeholder='Tu password'
                            value={password}
                            onChange={onChange}
                        />
                    </div>

                    <div className={style.CampoForm}>
                        <label htmlFor='confirm'>Confirm Password</label>
                        <input 
                            type="confirm"
                            id='confirm'
                            name='confirm'
                            placeholder='Repeat Password'
                            value={confirm}
                            onChange={onChange}
                        />
                    </div>


                    <div className={style.CampoForm}>
                        <input type="submit" className={style.Btn}/>
                    </div>

                </form>

                <Link to={'/'} className={style.EnlaceCuenta}>
                    Ya tienes cuenta? Click aqui.
                </Link>

        </div>
    </div>
    );
}

export default NuevaCuenta;