import React, { Fragment, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Task from './Task';
import proyectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';
const ListTasks = () => {

    const proyectsContext = useContext(proyectContext);
    const tasksContext = useContext(taskContext);
    
    const { project, deleteProjectFn } = proyectsContext;
    const { projectTasks } = tasksContext;

    if(!project) return <h2>Selecciona un proyecto</h2>;
    const [currentProject] = project;

    const handleClick = () => {
        deleteProjectFn(currentProject._id);
    }

    return ( 
        <Fragment>
            <h2>Proyecto: {currentProject.name}</h2>
            <ul className="listado-tareas">
                {projectTasks.length === 0
                    ? (<li className="tarea"><p>No hay tareas</p></li>)
                    : 
                    <TransitionGroup>
                        {projectTasks.map(task => (
                        <CSSTransition
                            key={task.id}
                            timeout={200}
                            classNames="tarea"
                        >
                            <Task 
                                key={task.id}
                                task={task}
                            />
                        </CSSTransition>
                        ))}
                    </TransitionGroup>
                    
                }
            </ul>

            <button 
                type="button"
                className="btn btn-eliminar"
                onClick={handleClick}
            >Eliminar Proyecto &times;</button>
            
        </Fragment>
     );
}
 
export default ListTasks;