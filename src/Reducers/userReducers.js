// src/Reducers/userReducers.js

import {
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS,
    USER_SIGNUP_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_SIGNOUT
} from "../Constants/useConstants";

const initialState = {
    loading: false,
    response: null,
    error: null,
};

export const userSigninReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return { ...state, loading: true };
        case USER_SIGNIN_SUCCESS:
            return { ...state, loading: false, response: action.payload, error: null };
        case USER_SIGNIN_FAIL:
            return { ...state, loading: false, error: action.payload, response: null };
        case USER_SIGNOUT:
            return { ...initialState };
        default:
            return state;
    }
};

export const userSignupReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_SIGNUP_REQUEST:
            return { ...state, loading: true };
        case USER_SIGNUP_SUCCESS:
            return { ...state, loading: false, response: action.payload, error: null };
        case USER_SIGNUP_FAIL:
            return { ...state, loading: false, error: action.payload, response: null };
        default:
            return state;
    }
};
