import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../Components/Header'
import { useDispatch, useSelector } from 'react-redux';
import { deleteNote, getNotes } from '../Actions/notesActions';

function HomeScreen(props) {
    //  props.history.push('/add-note')
    // but:
    // ✅ In React Router v6, props.history does not exist anymore.


    const navigate = useNavigate()
    const dispatch = useDispatch()
    const notes = useSelector(store => store.notes)
    const { error, response, loading } = notes

    // call this only once (when the page has loaded successfully)
    useEffect(() => {
        dispatch(getNotes())
    }, [])

    useEffect(() => { }, [error, response, loading])

    const onAddNote = () => {
        navigate('/add-note');
    }

    return (
        <div>
            <Header title="Home" />
            <button className="btn btn-primary float-end" onClick={onAddNote}>
                Add Note
            </button>

            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Contents</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {response && response.data && response.data.length > 0 ? (
                        response.data.map((note) => (
                            <tr key={note.id}>
                                <td>{note.id}</td>
                                <td>{note.title}</td>
                                <td>{note.contents}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-warning me-2"
                                        onClick={() => navigate(`/edit-note/${note.id}`, { state: note })}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => dispatch(deleteNote(note.id))}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">
                                No notes found.
                            </td>
                        </tr>
                    )}
                </tbody>

            </table>
        </div>
    )
}

export default HomeScreen
