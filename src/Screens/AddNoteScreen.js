import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../Components/Header'
import { useDispatch, useSelector } from 'react-redux'
import store from '../store'
import { addNote } from '../Actions/notesActions'

function AddNoteScreen(props) {
    const [title, setTitle] = useState('')
    const [contents, setContents] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate();


    const addNotesStore = useSelector(store => store.addNotes)
    const { loading, response, error } = addNotesStore

    useEffect(() => {
        if (response && (response.status == 'success')) {
            navigate('/home')
        } else if (error) {
            alert('error')
        }
    }, [loading, response, error,navigate])


    const Navigate = useNavigate()
    const onAdd = () => {
        dispatch(addNote(title, contents))
    }
    const onCancel = () => {
        Navigate('/home')
    }
    return (
        <div>
            <Header title="Add Notes" />

            <div className="form">
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" onChange={(e) => {
                        setTitle(e.target.value)
                    }} placeholder="title" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Contents</label>
                    <textarea className="form-control" rows="3" onChange={(e) => {
                        setContents(e.target.value)
                    }}></textarea>
                </div>
                <div className="mb-3">
                    <button onClick={onAdd} className="btn btn-success">Add</button>
                    <button onClick={onCancel} className="btn btn-danger float-end">Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default AddNoteScreen
