import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';

const Header = () => {
    
    const authContext = useContext(AuthContext);
    const { user, getLoggedUserFn, logOutFn } = authContext;
    
    useEffect(() => {
        getLoggedUserFn();
        // eslint-disable-next-line
    }, []); 

    return ( 
        <header className="app-header">
            {user ? <p className="nombre-usuario">Hola <span>{user.name}</span></p> : null }
            
            <nav className="nav-principal">
                <button
                    className="btn btn-blank cerrar-sesion"
                    onClick={() => logOutFn()}
                >Cerrar Sesión</button>
            </nav>
        </header>
     );
}
 
export default Header;