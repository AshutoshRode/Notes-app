import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNote, getNotes } from '../Actions/notesActions';
import {
  BookmarkIcon as BookmarkOutline,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import {
  BookmarkIcon as BookmarkSolid,
} from '@heroicons/react/24/solid';

function HomeScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, response, loading } = useSelector((store) => store.notes);

  const [noteList, setNoteList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedNotes, setExpandedNotes] = useState({});
  const [bookmarkedNotes, setBookmarkedNotes] = useState(
    JSON.parse(localStorage.getItem('bookmarkedNotes')) || []
  );

  const colors = [
    'bg-yellow-200',
    'bg-red-200',
    'bg-green-200',
    'bg-purple-200',
    'bg-blue-200',
    'bg-pink-200'
  ];

  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);

  useEffect(() => {
    if (response && response.data) {
      setNoteList(response.data);
    }
  }, [response]);

  useEffect(() => {
    localStorage.setItem('bookmarkedNotes', JSON.stringify(bookmarkedNotes));
  }, [bookmarkedNotes]);

  const onAddNote = () => navigate('/add-note');

  const onDeleteNote = (id) => {
    setNoteList((prevNotes) => prevNotes.filter((note) => note.id !== id));
    setBookmarkedNotes((prev) => prev.filter((bid) => bid !== id));
    dispatch(deleteNote(id));
  };

  const toggleExpand = (id) => {
    setExpandedNotes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleBookmark = (id) => {
    setBookmarkedNotes((prev) =>
      prev.includes(id) ? prev.filter((bid) => bid !== id) : [...prev, id]
    );
  };

  const filteredNotes = noteList
    .filter(
      (note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.contents.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aBookmarked = bookmarkedNotes.includes(a.id);
      const bBookmarked = bookmarkedNotes.includes(b.id);
      return bBookmarked - aBookmarked;
    });



  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
          <h2 className="text-3xl font-bold text-gray-800">Notes</h2>
          <button
            onClick={onAddNote}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-full transition"
          >
            + Add
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {loading && <p className="text-center text-sm text-gray-500">Loading notes...</p>}
        {error && (
          <p className="text-center text-sm text-red-600 bg-red-100 p-2 rounded-md">
            Failed to load notes.
          </p>
        )}

        {/* Notes grid */}
        {filteredNotes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredNotes.map((note, index) => {
              const isExpanded = expandedNotes[note.id];
              const previewText = note.contents.length > 100
                ? note.contents.substring(0, 100) + '...'
                : note.contents;
              const isBookmarked = bookmarkedNotes.includes(note.id);

              return (
                <div
                  key={note.id}
                  className={`${colors[index % colors.length]} p-4 rounded-xl shadow hover:shadow-lg transition flex flex-col justify-between relative`}
                >
                  {/* Bookmark button */}
                  <button
                    onClick={() => toggleBookmark(note.id)}
                    className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
                    title={isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
                  >
                    {isBookmarked ? (
                      <BookmarkSolid className="w-6 h-6" />
                    ) : (
                      <BookmarkOutline className="w-6 h-6" />
                    )}
                  </button>

                  {/* Note Content */}

                  <div>

                    <h3 className="font-bold text-lg mb-1">{note.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {note.createdAt || note.date || note.created_at
                        ? new Date(note.createdAt || note.date || note.created_at).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                        : "Date not available"}
                    </p>


                    <p className="text-sm text-gray-700 mb-2">
                      {isExpanded ? note.contents : previewText}
                    </p>
                    {note.contents.length > 100 && (
                      <button
                        onClick={() => toggleExpand(note.id)}
                        className="text-blue-600 hover:underline text-xs font-semibold"
                      >
                        {isExpanded ? 'Show Less' : 'Read More'}
                      </button>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end space-x-2 mt-auto">
                    <button
                      onClick={() => navigate(`/edit-note/${note.id}`, { state: note })}
                      className="p-1 bg-yellow-400 hover:bg-yellow-500 rounded-full"
                    >
                      <PencilSquareIcon className="w-5 h-5 text-white" />
                    </button>
                    <button
                      onClick={() => onDeleteNote(note.id)}
                      className="p-1 bg-red-500 hover:bg-red-600 text-white rounded-full"
                    >
                      <TrashIcon className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-6">No notes found.</p>
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
