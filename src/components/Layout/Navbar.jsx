import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { useFirebase } from 'react-redux-firebase';

export default function Navbar() {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const auth = useSelector(state => state.firebase.auth);
    const { logout } = useFirebase();

    useEffect(() => {
        if (auth.uid) {
            setAuthenticated(true);
        } else {
            setAuthenticated(false)
        }
    }, [auth]);

    const setLogout = () => {
        logout();
    }

    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
            <NavLink className="navbar-brand" to='/books'>Library</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor01">
                { isAuthenticated ? (
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active" to="/subscribers">Subscribers</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active" to="/books">Books</NavLink>
                        </li>
                    </ul>
                ) : null }
                { isAuthenticated ? (
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active" to="#!"> { auth.email } </NavLink>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-danger" onClick={ () => setLogout() }>Logout</button>
                        </li>
                    </ul>
                ) : null }
            </div>
        </nav>
    );
}

Navbar.propTypes = {
    firebase: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}