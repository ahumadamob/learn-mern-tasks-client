import React, { useContext } from 'react';

import projectContext from '../../context/projects/projectContext';
import taskContext from  '../../context/tasks/taskContext';

const Task = ({task}) => {

    const projectsContext = useContext(projectContext);
    const { project } = projectsContext;

    const [ currentProject ] = project;

    const tasksContext = useContext(taskContext);
    const { getProjectTasksFn, deleteTaskFn, updateTaskFn, setCurrentTaskFn } = tasksContext;
    
    const { name, completed } = task;   

    const deleteTask = taskId => {
        deleteTaskFn(taskId, currentProject._id);
        getProjectTasksFn(currentProject.id);
    }

    const handleClickSelectTask = task => {
        setCurrentTaskFn(task)
    }

    const handleClickChangeStatus = task => {
        if(task.completed){
            task.completed = false;
        }else{
            task.completed = true;            
        }
        updateTaskFn(task);
    }

    return ( 

       <li className="tarea sombra">
            <p>{name}</p>

            <div className="estado">
                {completed
                ? (
                    <button
                        type="button"
                        className="completo"
                        onClick={() => handleClickChangeStatus(task)}
                    >Completa</button>
                    )
                :   (
                    <button
                        type="button"
                        className="incompleto"
                        onClick={() => handleClickChangeStatus(task)}
                    >Incompleta</button>
                    )
                }
            </div>

            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => handleClickSelectTask(task)}
                >Editar</button>
                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => deleteTask(task._id)}
                >Eliminar</button>               
            </div>
        </li>
     );
}
 
export default Task;