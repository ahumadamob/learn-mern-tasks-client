import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const SignUp = (props) => {

    const alertContext = useContext(AlertContext);
    const { alert, showAlertFn } = alertContext;

    const authContext = useContext(AuthContext);
    const { message, logged, signUpFn } = authContext;

    /*
    Utilizo el useEffect en casos que:
    -- El usuario se haya autenticado
    -- El usuario se haya registrado
    -- El usuario se quiera registrar y sea un registro duplicado
    */
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
        username: '',
        email: '',
        password: '',
        passwordconfirm: ''

    });

    const { username, email, password, passwordconfirm } = user;

    const handleChange =  e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();

        //Validación que no se ingresen campos vacíos
        if(
            username.trim() === '' || 
            email.trim === '' || 
            password.trim() === '' || 
            passwordconfirm.trim() === '' ) {
                showAlertFn('Todos los campos son obligatorios', 'alerta-error');
                return;
        }

        //Password mínimo de 6 caracteres
        if(password.length < 6){
            showAlertFn('La contraseña debe tener 6 caracteres como mínimo', 'alerta-error');
            return;
        }

        //Los dos passwords deben ser iguales
        if(password !== passwordconfirm){
            showAlertFn('Las contraseñas no coinciden', 'alerta-error');           
            return;          
        }

        //Registrar el State
        signUpFn({
            name: username,
            email,
            password
        });

    }

    return ( 
        <div className="form-usuario">
            {alert ? (
                <div className={`alerta ${alert.category}`}>{ alert.msg }</div>
            ) : null }
            <div className="contenedor-form sombra-dark">                
                <h1>Crea tu cuenta</h1>
                <form  onSubmit={handleSubmit} >
                    <div className="campo-form">
                        <label htmlFor="username">
                            Tu Nombre
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Tu Nombre"
                            onChange={handleChange}
                            value={username}
                        />    
                    </div>
                    
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
                        <label htmlFor="passwordconfirm">
                            Confirma tu Password
                        </label>
                        <input
                            type="password"
                            id="passwordconfirm"
                            name="passwordconfirm"
                            placeholder="Repite tu password"
                            onChange={handleChange}
                            value={passwordconfirm}
                        />    
                    </div> 

                    <div className="campo-form">
                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Registrarme"
                        />
                    </div> 
                </form>

                <Link
                    to={'/'} className="enlace-cuenta"
                >¿Ya tienes cuenta? Inicia Sesión</Link>             

            </div>
        </div>
     );
}
 
export default SignUp;