import React, { useEffect, useState } from 'react';
// import Header from '../Components/Header';
import { Link, useNavigate } from 'react-router-dom';
import { signin } from '../Actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

function SigninScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const userSignin = useSelector((store) => store.userSignin);
  const { loading, error, response } = userSignin;

  const dispatch = useDispatch();

  const onSignin = () => {
    dispatch(signin(email, password));
  };

  useEffect(() => {
    if (response && response.status === 'success') {
      sessionStorage.setItem('token', response.data.token);
      navigate('/home');
    } else if (response && response.status === 'error') {
      alert(response.error);
    }
  }, [loading, error, response, navigate]);

  return (
    <>
      {/* <Header title="Sign In" /> */}
      <div className="min-h-screen bg-gradient-to-tr from-blue-100 via-white to-purple-100 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 transition-all duration-300">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-2">Welcome Back</h2>
          <p className="text-center text-gray-500 mb-6 text-sm">Please enter your credentials to sign in</p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md mb-4 text-sm">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <button
            onClick={onSignin}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200 shadow"
          >
            Sign In
          </button>

          <div className="text-sm text-center text-gray-600 mt-4">
            New user?{' '}
            <Link to="/signup" className="text-blue-600 font-medium hover:underline">
              Sign up here
            </Link>
          </div>

          {loading && (
            <div className="text-center mt-4 text-sm text-gray-500 animate-pulse">
              Signing you in...
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SigninScreen;
