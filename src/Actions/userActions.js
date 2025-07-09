// src/Actions/userActions.js

import {  
    USER_SIGNOUT,
    USER_SIGNUP_FAIL,
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNIN_FAIL
} from "../Constants/useConstants";

import axios from "axios";

// Logout
export const logout = () => {
    return (dispatch) => {
        sessionStorage.removeItem('token');
        dispatch({ type: USER_SIGNOUT });
        document.location.href = '/signin';
    };
};

// Signup
export const signup = (firstName, lastName, email, password) => {
    return (dispatch) => {
        dispatch({ type: USER_SIGNUP_REQUEST });

        const header = {
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const body = { firstName, lastName, email, password };
        const url = "https://notes-app-backend-tq8j.onrender.com/user/signup";

        axios.post(url, body, header)
            .then((response) => {
                dispatch({
                    type: USER_SIGNUP_SUCCESS,
                    payload: response.data,
                });
            })
            .catch((error) => {
                dispatch({
                    type: USER_SIGNUP_FAIL,
                    payload: error.message || 'Server error',
                });
            });
    };
};

// Signin
export const signin = (email, password) => {
    return (dispatch) => {
        dispatch({ type: USER_SIGNIN_REQUEST });

        const header = {
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const body = { email, password };
        const url = "https://notes-app-backend-tq8j.onrender.com/user/signin";

        axios.post(url, body, header)
            .then((response) => {
                dispatch({
                    type: USER_SIGNIN_SUCCESS,
                    payload: response.data,
                });
            })
            .catch((error) => {
                dispatch({
                    type: USER_SIGNIN_FAIL,
                    payload: error.message || 'Server error',
                });
            });
    };
};
