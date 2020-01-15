import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useFirestore } from 'react-redux-firebase';

export default function NewSubscriber({ history }) {
    const { collection } = useFirestore();

    const [fields, setFields] = useState({
        name: '',
        lastname: '',
        code: '',
        career: ''
    });

    const handleChange = e => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        });
    }

    const addSubscriber = e => {
        e.preventDefault();

        const subscriberData = { ...fields };

        collection('subscribers').add(subscriberData)
            .then(() => history.push('/subscribers'))
            .catch(err => console.error(err));
    }

    return (
        <div className="row">
            <div className="col-12 mb-4">
                <Link to='/subscribers' className="btn btn-secondary">
                    <i className="fas fa-arrow-circle-left"></i> Go Back
                </Link>
            </div>
            <div className="col-12">
                <h2>
                    <i className="fas fa-user-plus"></i> New Subscriber
                </h2>
                <div className="row justify-content-center">
                    <div className="col-md-8 mt-5">
                        <form onSubmit={ addSubscriber }>
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    id="name" 
                                    className="form-control" 
                                    placeholder="Subscriber's Name" 
                                    value={ fields.name }
                                    onChange={ handleChange }
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastname">Last Name:</label>
                                <input 
                                    type="text" 
                                    name="lastname" 
                                    id="lastname" 
                                    className="form-control" 
                                    placeholder="Subscriber's Last Name" 
                                    value={ fields.lastname }
                                    onChange={ handleChange }
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="career">Career:</label>
                                <input 
                                    type="text" 
                                    name="career" 
                                    id="career" 
                                    className="form-control" 
                                    placeholder="Subscriber's Career" 
                                    value={ fields.career }
                                    onChange={ handleChange }
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="code">Code:</label>
                                <input 
                                    type="text" 
                                    name="code" 
                                    id="code" 
                                    className="form-control" 
                                    placeholder="Subscriber's Name" 
                                    value={ fields.code }
                                    onChange={ handleChange }
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary float-right">
                            <i className="fas fa-user-plus"></i> Add New Subscriber
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

NewSubscriber.propType = {
    firestore: PropTypes.object.isRequired
}