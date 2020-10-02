import { SIGNUP_SUCCESS, SIGNUP_ERROR, GET_USER, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from '../../types';

export default (state, action) => {
    switch(action.type){
        case SIGNUP_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('mern_projects_token', action.payload.token);
            return {
                ...state,
                logged: true,
                message: null,
                loading: false
            }
        case GET_USER:
            return {
                ...state,
                logged: true,
                user: action.payload,
                loading: false
            }
        case LOGIN_ERROR:
        case SIGNUP_ERROR:
        case LOGOUT:
            localStorage.removeItem('mern_projects_token');
            return {
                ...state,
                token: null,
                user: null,
                logged: null,
                message: action.payload,
                loading: false
            }
        default:
            return state;
    }
}