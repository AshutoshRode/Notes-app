import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../Actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

function SignupScreen(props) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userSignup = useSelector((store) => store.userSignup);
    const { loading, response, error } = userSignup;

 useEffect(() => {
    console.log('useEffect called');
    console.log('loading:', loading);
    console.log('response:', response);
    console.log('error:', error);

    if (response && (response.status === 'success' || response.success || response.status === 200)) {
        navigate('/signin');
    } else if (error) {
        console.log(error);
        alert('Error while making API call');
    }
}, [loading, response, error, navigate]);


    const onSignup = () => {
        dispatch(signup(firstName, lastName, email, password));
    };

    return (
        <div>
            <Header title="Sign Up" />

            <div className="Signup">
                <div className="form">
                    <div className="mb-3">
                        <label className="form-label">First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="test@test.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="*****"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <button onClick={onSignup} className="btn btn-success">
                            Sign Up
                        </button>
                        <div className="float-end">
                            Already have an account? <Link to="/signin">Sign in here</Link>
                        </div>
                    </div>
                </div>
            </div>

           {userSignup.loading && <div>Waiting for result</div>}
        </div>
    );
}

export default SignupScreen;



