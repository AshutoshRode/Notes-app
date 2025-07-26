// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import logger from "redux-logger";
import { userSigninReducer, userSignupReducer } from "./Reducers/userReducers";
import { addNotesReducer, fetchNotesReducer } from './Reducers/notesReducers';

// ✅ Get user info from localStorage
const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

const preloadedState = {
    userSignin: {
        response: userInfoFromStorage
    }
};

const store = configureStore({
    reducer: {
        userSignup: userSignupReducer,
        userSignin: userSigninReducer,
        addNotes: addNotesReducer,
        notes: fetchNotesReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(logger),
    devTools: true,
    preloadedState, // ✅ Set preloaded user state
});

export default store;
