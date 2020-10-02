import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Login = (props) => {

    const alertContext = useContext(AlertContext);
    const { alert, showAlertFn } = alertContext;

    const authContext = useContext(AuthContext);
    const { message, logged, logInFn } = authContext;

    // Inicio de sesión inválido
    useEffect(() => {        
        if(logged){
            props.history.push('/projects');
        }
        if(message){
            showAlertFn(message.msg, message.category);
        }
        // eslint-disable-next-line
    }, [message, logged, props.history])


    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const { email, password } = user;

    const handleChange =  e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });

    }

    const handleSubmit = e => {
        e.preventDefault();

        if(email.trim() === '' || password.trim() === ''){
            showAlertFn('Todos los campos son obligatorios', 'alerta-error');
        }
        logInFn({ email, password });
    }

    return ( 
        <div className="form-usuario">
            {alert ? (
                <div className={`alerta ${alert.category}`}>{ alert.msg }</div>
            ) : null }
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesión</h1>
                <form onSubmit={handleSubmit} >                
                    <div className="campo-form">
                        <label htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu Email"
                            onChange={handleChange}
                            value={email}
                        />    
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu Password"
                            onChange={handleChange}
                            value={password}
                        />    
                    </div> 

                    <div className="campo-form">
                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Iniciar Sesión"
                        />
                    </div>
                </form> 

                <Link
                    to={'/signup'} className="enlace-cuenta"
                >Crear una cuenta</Link>             

            </div>
        </div>
     );
}
 
export default Login;