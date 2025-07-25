// src/Screens/SigninScreen.js

import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { signin } from '../Actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SigninScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const userSignin = useSelector(store => store.userSignin);
    const { loading, error, response } = userSignin;

    const dispatch = useDispatch();

    const onSignin = () => {
        if (!email || !password) {
            toast.error('Please enter email and password');
            return;
        }
        dispatch(signin(email, password));
    };

    useEffect(() => {
        // Show verification success toast if redirected from email verification
        const params = new URLSearchParams(location.search);
        if (params.get('verified') === 'true') {
            toast.success('Your email has been verified! Please log in.');
        }
    }, [location]);

    useEffect(() => {
        if (response && response.status === 'success') {
            sessionStorage.setItem('token', response.data.token);
            toast.success(`Welcome ${response.data.firstName}!`);
            navigate('/home');
        } else if (response && response.status === 'error') {
            toast.error(response.error);
        } else if (error) {
            toast.error(error);
        }
    }, [loading, error, response, navigate]);

    return (
        <div>
            <Header title="Sign In" />
            <div className="Signin">
                <div className="form container mt-4" style={{ maxWidth: '400px' }}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            className="form-control"
                            placeholder="test@test.com"
                            value={email}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="form-control"
                            placeholder="*****"
                            value={password}
                        />
                    </div>
                    <div className="mb-3 d-flex justify-content-between align-items-center">
                        <button onClick={onSignin} className="btn btn-success">Sign In</button>
                        <div>
                            New User? <Link to="/signup">Signup here</Link>
                        </div>
                    </div>
                </div>
                {loading && (
                    <div className="text-center mt-3">
                        <div className="spinner-border text-success" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <div>Signing in...</div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SigninScreen;
