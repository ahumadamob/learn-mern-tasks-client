import React, { useContext } from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';

const Project = ({project}) => {

    const projectsContext = useContext(projectContext);
    const tasksContext = useContext(taskContext);

    const { setCurrentProjectFn } = projectsContext;
    const { getProjectTasksFn } = tasksContext;

    const handleClick = projectId => {
        setCurrentProjectFn(projectId);
        getProjectTasksFn(projectId);
    }

    return ( 
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={() => handleClick(project._id)}
            >{project.name}</button>
        </li>
    );
}
 
export default Project;