import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';

import { SIGNUP_SUCCESS, SIGNUP_ERROR, GET_USER, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from '../../types';
import axiosClient from '../../config/axios';
import tokenAuth from '../../config/token';

const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('mern_projects_token'),
        logged: null,
        loading: true,
        user: null,
        message: null
    };
    const [ state, dispatch] = useReducer(AuthReducer, initialState);

    const signUpFn = async userData => {
        try {
            const res = await axiosClient.post('/api/users', userData);
            dispatch({
                type: SIGNUP_SUCCESS,
                payload: res.data
            });
            getLoggedUserFn();
            
        } catch (error) {
            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            }
            dispatch({
                type: SIGNUP_ERROR,
                payload: alert
            });
        }
    }

    const getLoggedUserFn = async () => {
        const token = localStorage.getItem('mern_projects_token');
        if(token){
            tokenAuth(token);
        }
        try {
            const res = await axiosClient.get('/api/auth');
            dispatch({
                type: GET_USER,
                payload: res.data.user
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: LOGIN_ERROR
            });
        }
    }

    const logInFn = async data => {
        try {
            const res = await axiosClient.post('/api/auth', data);
            console.log(res);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
            getLoggedUserFn();
            
        } catch (error) {
            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alert
            });        
        }
    }

    const logOutFn = () => {
        dispatch({
            type: LOGOUT
        })
    }

    return(
        <AuthContext.Provider
            value={{
                token: state.token,
                logged: state.logged,
                loading: state.loading,
                user: state.user,
                message: state.message,
                signUpFn,
                logInFn,
                getLoggedUserFn,
                logOutFn
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;