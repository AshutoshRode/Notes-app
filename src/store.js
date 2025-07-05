import { configureStore } from '@reduxjs/toolkit';
import logger from "redux-logger";
import { userSigninReducer, userSignupReducer } from "./Reducers/userReducers";
import { addNotesReducer, fetchNotesReducer } from './Reducers/notesReducers';

const store = configureStore({
    reducer: {
        userSignup: userSignupReducer,
        userSignin: userSigninReducer,
        addNotes: addNotesReducer,
        notes: fetchNotesReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(logger),
    devTools: true, // optional, enabled by default in development
});

export default store;
