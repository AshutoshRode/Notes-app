import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../Actions/userActions';

function Navigation() {
  const dispatch = useDispatch();
  const { response } = useSelector((store) => store.userSignin);

  const onLogout = () => {
    dispatch(logout());
  };

  if (!response) return null;

  const user = response.data; // 👈 adjust if your structure is different
  const userName = user?.firstName || user?.name || 'User';

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/home" className="text-xl font-semibold text-blue-700 hover:text-blue-900">
          Notes App
        </Link>

        <ul className="flex items-center space-x-6">
          <li>
            <Link
              to="/home"
              className="text-gray-700 hover:text-blue-600 transition font-medium"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-gray-700 hover:text-blue-600 transition font-medium"
            >
              About
            </Link>
          </li>
        </ul>

        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-700 font-medium">Hi, {userName} 👋</span>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
