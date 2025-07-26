import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../Actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

function SignupScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userSignup = useSelector((store) => store.userSignup);
  const { loading, response, error } = userSignup;

  useEffect(() => {
    if (response && (response.status === 'success' || response.success || response.status === 200)) {
      alert('Signup successful! ✅ Please verify your email before logging in.');
      navigate('/signin');
    } else if (error) {
      alert('Error while making API call');
    }
  }, [loading, response, error, navigate]);

  const onSignup = () => {
    dispatch(signup(firstName, lastName, email, password));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md transition-all duration-300">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-2">Create Your Account</h2>
        <p className="text-sm text-center text-gray-600 mb-6">Sign up to get started</p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <button
          onClick={onSignup}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200 shadow"
        >
          Sign Up
        </button>

        <div className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{' '}
          <Link to="/signin" className="text-blue-600 hover:underline font-medium">
            Sign in here
          </Link>
        </div>

        {loading && (
          <div className="text-center mt-4 text-sm text-gray-500 animate-pulse">
            Creating your account...
          </div>
        )}
      </div>
    </div>
  );
}

export default SignupScreen;
