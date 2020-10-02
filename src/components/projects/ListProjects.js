import React, { useContext, useEffect } from 'react';
import Project from './Project';
import projectContext from '../../context/projects/projectContext';
import AlertContext from '../../context/alert/alertContext';
import { TransitionGroup, CSSTransition} from 'react-transition-group';

const ListProjects = () => {

    const projectsContext = useContext(projectContext);
    const { projects, message,  getProjectsFn } = projectsContext;

    const alertContext = useContext(AlertContext);
    const { alert, showAlertFn } = alertContext;

    useEffect(() => {
        if(message){
            showAlertFn(message.msg, message.category);
        }
        getProjectsFn();
        // eslint-disable-next-line
    }, [message]);

    if(projects.length === 0 ) return <p>No tienes proyectos. Comienza creando uno.</p>;

    return ( 
        <ul className="listado-proyectos">
            {alert ? (
                <div className={`alerta ${alert.category}`}>{alert.msg}</div>
            ) : null }
            <TransitionGroup>            
                {projects.map(project => (
                    <CSSTransition
                        key={project._id}
                        timeout={200}
                        classNames="proyecto"
                    >
                        <Project
                            
                            project={project}
                    /> 
                    </CSSTransition>
                ))}
            </TransitionGroup>    
        </ul>

     );
}
 
export default ListProjects;