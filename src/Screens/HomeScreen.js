// HomeScreen.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNote, getNotes } from '../Actions/notesActions';

function HomeScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notes = useSelector((store) => store.notes);
  const { error, response, loading } = notes;

  const [noteList, setNoteList] = useState([]);

  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);

  useEffect(() => {
    if (response && response.data) {
      setNoteList(response.data);
    }
  }, [response]);

  const onAddNote = () => {
    navigate('/add-note');
  };

  const onDeleteNote = (id) => {
    // Optimistically update UI
    setNoteList((prevNotes) => prevNotes.filter((note) => note.id !== id));
    dispatch(deleteNote(id)); // Send API request in background
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Your Notes</h2>
          <button
            onClick={onAddNote}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md transition"
          >
            + Add Note
          </button>
        </div>

        {loading && <p className="text-center text-sm text-gray-500">Loading notes...</p>}
        {error && (
          <p className="text-center text-sm text-red-600 bg-red-100 p-2 rounded-md">
            Failed to load notes.
          </p>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 border-b">ID</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 border-b">Title</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 border-b">Content</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {noteList.length > 0 ? (
                noteList.map((note) => (
                  <tr key={note.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-2 border-b text-sm text-gray-700">{note.id}</td>
                    <td className="px-4 py-2 border-b text-sm text-gray-700">{note.title}</td>
                    <td className="px-4 py-2 border-b text-sm text-gray-700">{note.contents}</td>
                    <td className="px-4 py-2 border-b text-sm text-gray-700 space-x-2">
                      <button
                        onClick={() => navigate(`/edit-note/${note.id}`, { state: note })}
                        className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded-md text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDeleteNote(note.id)}
                        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-sm text-gray-500">
                    No notes found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
