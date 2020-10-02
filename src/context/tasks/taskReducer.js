import {
    GET_PROJECT_TASKS, ADD_TASK, DELETE_TASK, FORM_TASK_VALIDATE,
    CURRENT_TASK, UPDATE_TASK, CLEAN_CURRENT_TASK
} from '../../types/index';

export default (state, action) => {
    switch(action.type){
        case GET_PROJECT_TASKS:
            return {
                ...state,
                projectTasks: action.payload
            }
        case ADD_TASK:
            return {
                ...state,
                projectTasks: [...state.projectTasks, action.payload],
                errorTask: false,
            }
        case DELETE_TASK:
            return {
                ...state,
                projectTasks: state.projectTasks.filter(task => task._id !== action.payload)
            }

        case FORM_TASK_VALIDATE:
            return {
                ...state,
                errorTask: true,
            }        

        case UPDATE_TASK:
            return {
                ...state,
                projectTasks: state.projectTasks.map(task => task._id === action.payload._id ? action.payload : task) 
            }

        case CURRENT_TASK:
            return {
                ...state,
                currentTask: action.payload
            }         
        case CLEAN_CURRENT_TASK:
            return {
                ...state,
                currentTask: null,
            }
            
        default:
            return state;
    }
}