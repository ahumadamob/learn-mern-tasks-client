import React, { useReducer } from 'react';
import projectContext from './projectContext';
import projectReducer from './projectReducer';
import {    FORM_PROJECT, GET_PROJECTS, ADD_PROJECT, ERROR_PROJECT,
            FORM_VALIDATE, CURRENT_PROJECT, DELETE_PROJECT 
} from '../../types';
import axiosClient from '../../config/axios';

const ProjectState = props => {

    const initialState =  {
        projects: [],
        project: null,
        showProjectForm: false,
        showProjectError: false,
        message: null
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(projectReducer, initialState);

    //Funciones para el CRUD
    const showProjectFormFn = () => {
        dispatch({
            type: FORM_PROJECT            
        })
    }

    const getProjectsFn = async () => {
        try {
            const res = await axiosClient.get('/api/projects')
            dispatch({
                type: GET_PROJECTS,
                payload: res.data.projects
            });
        } catch (error) {
            const alert = {
                msg: 'Error de Servidor',
                category: 'alerta-error'
            }
            dispatch({
                type: ERROR_PROJECT,
                payload: alert
            });
        }        
    }

    const addProjectFn = async project => { 
        try {
            const res = await axiosClient.post('/api/projects', project);
            console.log(res);
            dispatch({
                type: ADD_PROJECT,
                    payload: res.data
            });
            
        } catch (error) {
            const alert = {
                msg: 'Error de Servidor',
                category: 'alerta-error'
            }
            dispatch({
                type: ERROR_PROJECT,
                payload: alert
            });
        }      
        

    }

    const showProjectErrorFn = () => {
        dispatch({
            type: FORM_VALIDATE
        })
    }

    const setCurrentProjectFn = projectId => {
        dispatch({
            type: CURRENT_PROJECT,
            payload: projectId
        })
    }

    const deleteProjectFn = async projectId => {
        try {
            await axiosClient.delete(`/api/projects/${projectId}`);
            dispatch({
                type: DELETE_PROJECT,
                payload: projectId
            });
        } catch (error) {
            const alert = {
                msg: 'Error de Servidor',
                category: 'alerta-error'
            }
            dispatch({
                type: ERROR_PROJECT,
                payload: alert
            });
        }        
    }

    return(
        <projectContext.Provider
            value={{
                projects: state.projects,
                project: state.project,
                showProjectForm: state.showProjectForm,
                showProjectError: state.showProjectError,
                message: state.message,
                showProjectFormFn,
                showProjectErrorFn,
                getProjectsFn,
                addProjectFn,
                setCurrentProjectFn,
                deleteProjectFn
            }}
        >
            {props.children}
        </projectContext.Provider>
    )
}

export default ProjectState;
