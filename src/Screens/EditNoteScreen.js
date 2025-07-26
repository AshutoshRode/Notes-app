import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateNote } from '../Actions/notesActions';
import { useLocation, useNavigate } from 'react-router-dom';
// import Header from '../Components/Header';

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
    <>
      {/* <Header title="Edit Note" /> */}
      <div className="min-h-screen bg-gradient-to-r from-purple-100 to-blue-100 flex items-center justify-center px-4">
        <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Edit Your Note</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Contents</label>
            <textarea
              rows="5"
              value={contents}
              onChange={(e) => setContents(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
            ></textarea>
          </div>

          <button
            onClick={onUpdate}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200 shadow"
          >
            Update Note
          </button>
        </div>
      </div>
    </>
  );
}

export default EditNoteScreen;
