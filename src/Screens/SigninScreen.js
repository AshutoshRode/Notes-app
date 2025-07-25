// src/Screens/SigninScreen.js

import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import { Link, useNavigate } from 'react-router-dom';
import { signin } from '../Actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

function SigninScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const userSignin = useSelector(store => store.userSignin);
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
        } else if (error) {
            alert(error);
        }
    }, [loading, error, response, navigate]);

    return (
        <div>
            <Header title="Sign In" />
            <div className="Signin">
                <div className="form">
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" placeholder="test@test.com" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" placeholder="*****" />
                    </div>
                    <div className="mb-3">
                        <button onClick={onSignin} className="btn btn-success">Sign In</button>
                        <div className="float-end">
                            New User? <Link to="/signup">Signup here</Link>
                        </div>
                    </div>
                </div>
            </div>
            {loading && <div>Waiting for response...</div>}
        </div>
    );
}

export default SigninScreen;
