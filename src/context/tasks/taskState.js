import React, { useReducer } from 'react';
import TaskContext from './taskContext';
import TaskReducer from './taskReducer';
import axiosClient from '../../config/axios';

import {
    GET_PROJECT_TASKS, ADD_TASK, FORM_TASK_VALIDATE, DELETE_TASK,
    CURRENT_TASK,
    UPDATE_TASK,
    CLEAN_CURRENT_TASK
} from '../../types/index';

const TaskState = props => {
    
    const initialState = {
        projectTasks: [], 
        errorTask: false,
        currentTask: null  
    }
    
    const [state, dispatch] = useReducer(TaskReducer, initialState);
    
    const getProjectTasksFn = async project => {
        try {
            const res = await axiosClient.get('/api/tasks', { params: { project }});
            dispatch({
                type: GET_PROJECT_TASKS,
                payload: res.data.tasks
            });          
        } catch (error) {
            console.log(error);
        }
    }

    const addTaskFn = async task => {
        try {
            await axiosClient.post('/api/tasks', task);
            dispatch({
                type: ADD_TASK,
                payload: task
            });    
        } catch (error) {
            console.log(error);
        }        
    }

    const updateTaskFn = async task => {
        try {
            const res = await axiosClient.put(`/api/tasks/${task._id}`, task);
            dispatch({
                type: UPDATE_TASK,
                payload: res.data.task
            });  
        } catch (error) {
            console.log(error);            
        }        
    }

    const deleteTaskFn = async (taskId, project) => {
        try {
            await axiosClient.delete(`/api/tasks/${taskId}`, { params: { project }});
            dispatch({
            type: DELETE_TASK,
            payload: taskId
            });  
        } catch (error) {
            console.log(error);            
        }        
    }

    const showTaskErrorFn = () => {
        dispatch({
            type: FORM_TASK_VALIDATE
        });
    }

    const setCurrentTaskFn = task => {
        dispatch({
            type: CURRENT_TASK,
            payload: task
        });
    }

    const cleanCurrentTaskFn = () => {
        dispatch({
            type: CLEAN_CURRENT_TASK
        })
    }

    return(
    <TaskContext.Provider
        value={{
            projectTasks: state.projectTasks,
            errorTask: state.errorTask,
            currentTask: state.currentTask,
            getProjectTasksFn,
            addTaskFn,
            deleteTaskFn,
            updateTaskFn,
            showTaskErrorFn,
            setCurrentTaskFn,
            cleanCurrentTaskFn            
        }}
    >
        {props.children}
    </TaskContext.Provider>

    );
}

export default TaskState;