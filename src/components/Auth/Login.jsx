import React, { useState } from 'react';
import { useFirebase } from 'react-redux-firebase';
import PropTypes from 'prop-types';

export default function Login() {
    const { login } = useFirebase();

    const [keys, setKeys] = useState({
        email: '',
        password: ''
    });

    const handleChange = e => {
        setKeys({
            ...keys,
            [e.target.name]: e.target.value
        });
    }

    const signIn = e => {
        e.preventDefault();

        const { email, password } = keys;

        login({
            email,
            password
        }).then(res => console.log('YEAH!'))
          .catch(err => console.error(err));
    }

    return(
        <div className="row justify-content-center">
            <div className="col-md-5">
                <h2 className="text-center py-4">
                    <i className="fas fa-lock"></i> Sign In
                </h2>
                <form onSubmit={ signIn }>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input 
                            type="email" 
                            name="email" 
                            id="email"
                            className="form-control"
                            value={ keys.email }
                            onChange={ handleChange }
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input 
                            type="password" 
                            name="password" 
                            id="password"
                            className="form-control"
                            value={ keys.password }
                            onChange={ handleChange }
                            required
                        />
                    </div>
                    <button 
                        type="submit"
                        className="btn btn-success btn-block"
                    >
                        <i className="fas fa-sign-in-alt"></i> Login
                    </button>
                </form>
            </div>
        </div>
    );
}

Login.propTypes = {
    firebase: PropTypes.object.isRequired
}