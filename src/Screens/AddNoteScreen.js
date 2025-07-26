import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import Header from '../Components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { addNote } from '../Actions/notesActions';

function AddNoteScreen() {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addNotesStore = useSelector((store) => store.addNotes);
  const { loading, response, error } = addNotesStore;

  useEffect(() => {
    if (response && response.status === 'success') {
      navigate('/home');
    } else if (error) {
      alert('Error while adding note');
    }
  }, [loading, response, error, navigate]);

  const onAdd = () => {
    dispatch(addNote(title, contents));
  };

  const onCancel = () => {
    navigate('/home');
  };

  return (
    <>
      {/* <Header title="Add Notes" /> */}
      <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center px-4">
        <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Add a New Note</h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md mb-4 text-sm">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              placeholder="Note title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Contents</label>
            <textarea
              rows="4"
              placeholder="Write your note here..."
              value={contents}
              onChange={(e) => setContents(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
            ></textarea>
          </div>

          <div className="flex justify-between">
            <button
              onClick={onCancel}
              className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
            >
              Cancel
            </button>
            <button
              onClick={onAdd}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
            >
              Add Note
            </button>
          </div>

          {loading && (
            <div className="text-center mt-4 text-sm text-gray-500 animate-pulse">
              Adding your note...
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AddNoteScreen;
