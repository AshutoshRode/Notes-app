import {
    NOTE_ADD_FAIL,
    NOTE_ADD_REQUEST,
    NOTE_ADD_SUCCESS,
    NOTE_FETCH_FAIL,
    NOTE_FETCH_REQUEST,
    NOTE_FETCH_SUCCESS,
    NOTE_UPDATE_REQUEST,
    NOTE_UPDATE_SUCCESS,
    NOTE_UPDATE_FAIL,
    NOTE_DELETE_REQUEST,
    NOTE_DELETE_SUCCESS,
    NOTE_DELETE_FAIL,
} from "../Constants/notesConstants";

import axios from "axios";

// ✅ Add Note
export const addNote = (title, contents) => {
    return (dispatch) => {
        dispatch({ type: NOTE_ADD_REQUEST });

        const header = {
            headers: {
                "Content-Type": "application/json",
                token: sessionStorage["token"],
            },
        };
        const body = { title, contents };

        const url = "http://localhost:4000/notes";
        axios
            .post(url, body, header)
            .then((response) => {
                dispatch({
                    type: NOTE_ADD_SUCCESS,
                    payload: response.data,
                });
            })
            .catch((error) => {
                dispatch({
                    type: NOTE_ADD_FAIL,
                    payload: error.message || "Add Note Failed",
                });
            });
    };
};

// ✅ Fetch Notes
export const getNotes = () => {
    return (dispatch) => {
        dispatch({ type: NOTE_FETCH_REQUEST });

        const header = {
            headers: {
                "Content-Type": "application/json",
                token: sessionStorage["token"],
            },
        };

        const url = "http://localhost:4000/notes";
        axios
            .get(url, header)
            .then((response) => {
                dispatch({
                    type: NOTE_FETCH_SUCCESS,
                    payload: response.data,
                });
            })
            .catch((error) => {
                dispatch({
                    type: NOTE_FETCH_FAIL,
                    payload: error.message || "Fetch Notes Failed",
                });
            });
    };
};

// ✅ Update Note
export const updateNote = (id, title, contents) => {
    return (dispatch) => {
        dispatch({ type: NOTE_UPDATE_REQUEST });

        const header = {
            headers: {
                "Content-Type": "application/json",
                token: sessionStorage["token"],
            },
        };

        const body = { title, contents };

        const url = `http://localhost:4000/notes/${id}`;
        axios
            .put(url, body, header)
            .then((response) => {
                dispatch({
                    type: NOTE_UPDATE_SUCCESS,
                    payload: response.data,
                });
            })
            .catch((error) => {
                dispatch({
                    type: NOTE_UPDATE_FAIL,
                    payload: error.message || "Update Note Failed",
                });
            });
    };
};

// ✅ Delete Note
export const deleteNote = (id) => {
    return (dispatch) => {
        dispatch({ type: NOTE_DELETE_REQUEST });

        const header = {
            headers: {
                "Content-Type": "application/json",
                token: sessionStorage["token"],
            },
        };

        const url = `http://localhost:4000/notes/${id}`;
        axios
            .delete(url, header)
            .then((response) => {
                dispatch({
                    type: NOTE_DELETE_SUCCESS,
                    payload: response.data,
                });
            })
            .catch((error) => {
                dispatch({
                    type: NOTE_DELETE_FAIL,
                    payload: error.message || "Delete Note Failed",
                });
            });
    };
};
