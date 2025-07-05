import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateNote } from '../Actions/notesActions';
import { useLocation, useNavigate } from 'react-router-dom';

function EditNoteScreen() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const note = location.state;

    const [title, setTitle] = useState(note.title);
    const [contents, setContents] = useState(note.contents);

    const onUpdate = () => {
        dispatch(updateNote(note.id, title, contents));
        navigate('/home');
    };

    return (
        <div className="container mt-3">
            <h2>Edit Note</h2>
            <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Contents</label>
                <textarea
                    className="form-control"
                    rows="5"
                    value={contents}
                    onChange={(e) => setContents(e.target.value)}
                ></textarea>
            </div>
            <button onClick={onUpdate} className="btn btn-primary">Update</button>
        </div>
    );
}

export default EditNoteScreen;
