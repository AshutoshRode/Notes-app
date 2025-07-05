import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../Actions/userActions';


function Navigation() {
    const dispatch = useDispatch();

    const userSignin = useSelector(store => store.userSignin)
    const onLogout = () => {

        dispatch(logout())
    }

    return (

        <div>
            {userSignin.response &&
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">

                        <Link to='/home' className="navbar-brand ">
                            <span className="nav-link" >Notes App</span>
                        </Link>
                        {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button> */}
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link to="/home" className='nav-link'>Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/about" className='nav-link'>About</Link>
                                </li>


                            </ul>
                            <div className="d-flex" role="search">

                                <button className="btn btn-outline-danger" type="button" onClick={onLogout}>Logout</button>
                            </div>
                        </div>
                    </div>
                </nav>
            }
        </div>

    )
}

export default Navigation
