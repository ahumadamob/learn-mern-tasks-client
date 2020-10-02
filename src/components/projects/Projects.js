import React, { useContext } from 'react';
import Sidebar from '../layout/Sidebar';
import Header from '../layout/Header';
import FrmTask from '../tasks/FrmTask';
import ListTasks from '../tasks/ListTasks';
import AuthContext from '../../context/auth/authContext';
import { useEffect } from 'react';

const Projects = () => {

    const authContext = useContext(AuthContext);
    const { getLoggedUserFn } = authContext;
    
    useEffect(() => {
        getLoggedUserFn();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="contenedor-app">
            <Sidebar />
            <div className="seccion-principal">
                <Header />
                <main>
                    <FrmTask />
                    <div className="contenedor-tareas">
                        <ListTasks />
                    </div>
                </main>
            </div>
        </div>
    );
}
 
export default Projects;