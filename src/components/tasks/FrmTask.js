import React, { useContext, useState, useEffect } from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';
const FrmTask = () => {

    const projectsContext = useContext(projectContext);
    const tasksContext = useContext(taskContext);

    const { project } = projectsContext;
    const { errorTask, currentTask,
        addTaskFn, updateTaskFn, showTaskErrorFn, getProjectTasksFn, cleanCurrentTaskFn } = tasksContext;

    //State local del formulario
    const [formData, setFormData] = useState({
        name: ''
    })
    const { name } = formData;

    useEffect(() => {
        if(currentTask !== null){
            setFormData(currentTask)
        }else{
            setFormData({
                name: ''
            })
        }

    }, [currentTask])

    if(!project) return null;
    const [currentProject] = project;

    const handleSubmit = e => {
        e.preventDefault();

        //Validacion
        if(name.trim() === ''){
            showTaskErrorFn();
            return;
        }        

        
        if(currentTask === null) {
            //Agregar la nueva tarea al State de Tareas
            formData.project = currentProject._id;
            formData.status = false;
            addTaskFn(formData);
        }else{
            updateTaskFn(formData);
            cleanCurrentTaskFn();
        }
        

        //Obtener nuevamente el listado de tareas
        getProjectTasksFn(currentProject.id);

        //Reiniciar el formulario
        setFormData({
            name: ''
        })

    }

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return ( 
        <div className="formulario">
            <form
                onSubmit={handleSubmit}
            >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="El nombre de tu tarea aquí"
                        name="name"
                        value={name}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={currentTask ? 'Editar Tarea' : 'Agregar Tarea'}
                    />
                </div>
            </form>
            {errorTask ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}
        </div>
     );
}
 
export default FrmTask;