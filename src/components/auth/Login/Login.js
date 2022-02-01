import React, { useState, useContext, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import alertaContext from '../../../context/alertas/alertaContext';
import authContext from '../../../context/autenticacion/authContex';

//Style
import style from './Login.module.css'


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
        }

        // Pasarlo al action
        iniciarSesion({email, password});
    }

    return ( 
        <div className={style.FormLogin}>
            
            {alerta ? (<div> {alerta.msg} </div> ) : null }

            <div className={style.ContainerForm}>
                
                <h1>Iniciar Sesion</h1>

                    <form onSubmit={onSubmit}>
                        
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
                            <input type="submit" className={style.Btn}/>
                        </div>

                    </form>

                    <Link to={'/nueva-cuenta'} className={style.EnlaceCuenta}>
                        Obtener Cuenta
                    </Link>

            </div>
        </div>
    );
}

export default Login;