import { 
    FORM_PROJECT, GET_PROJECTS, ADD_PROJECT, ERROR_PROJECT,
    FORM_VALIDATE, CURRENT_PROJECT, DELETE_PROJECT 
} from '../../types';
export default (state, action) => {
    switch(action.type){
        case FORM_PROJECT:
            return {
                ...state,
                showProjectForm: true
            }
        case GET_PROJECTS:
            return {
                ...state,
                projects: action.payload
            }
        case ADD_PROJECT:
            return {
                ...state,
                projects: [...state.projects, action.payload],
                showProjectForm: false,
                showProjectError: false,
            }
        case FORM_VALIDATE:
            return {
                ...state,
                showProjectError: true
            }
        case CURRENT_PROJECT:
            return {
                ...state,
                project: state.projects.filter(project => project._id === action.payload)
            }
        case DELETE_PROJECT:
            return {
                ...state,
                projects: state.projects.filter(project => project._id !== action.payload),
                project: null
            }
        case ERROR_PROJECT:
            return {
                ...state,
                message: action.payload
            }
        default: 
            return state;
    }
}