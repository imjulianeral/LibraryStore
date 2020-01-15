import React from 'react';
import { NavLink } from 'react-router-dom'


export default function Navbar() {
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-5">
            <NavLink className="navbar-brand" to='/'>Library</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" to="/subscribers">Subscribers</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" to="/books">Books</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}