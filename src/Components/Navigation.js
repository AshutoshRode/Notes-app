import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../Actions/userActions";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

function Navigation() {
  const dispatch = useDispatch();
  const { response } = useSelector((store) => store.userSignin);
  const [isOpen, setIsOpen] = useState(false);

  const onLogout = () => {
    dispatch(logout());
  };

  if (!response) return null;

  const user = response.data; // adjust if your structure is different
  const userName = user?.firstName || user?.name || "User";

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/home"
          className="text-xl font-semibold text-blue-700 hover:text-blue-900"
        >
          Notes App
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-6">
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
          <li>
            <Link to="/profile" className="text-gray-700 hover:text-blue-600 transition font-medium">
              Profile
            </Link>
          </li>
        </ul>

        {/* Desktop User */}
        <div className="hidden md:flex items-center space-x-4">
          <span className="text-sm text-gray-700 font-medium">
            Hi, {userName} 👋
          </span>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none"
        >
          {isOpen ? (
            <XMarkIcon className="h-6 w-6 text-gray-700" />
          ) : (
            <Bars3Icon className="h-6 w-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <ul className="flex flex-col p-4 space-y-3">
            <li>
              <Link
                to="/home"
                className="block text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link to="/profile" onClick={() => setIsOpen(false)} className="block text-gray-700 hover:text-blue-600 font-medium">
                Profile
              </Link>
            </li>
          </ul>
          <div className="flex flex-col items-start p-4 space-y-3 border-t border-gray-100">
            <span className="text-sm text-gray-700 font-medium">
              Hi, {userName} 👋
            </span>
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
