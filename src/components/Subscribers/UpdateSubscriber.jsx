import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase';

import Loading from '../Layout/Loading';

export default function UpdateSubscriber({ match: { params: { id } }, history }) {
    const name = useRef();
    const lastname = useRef();
    const career = useRef();
    const code = useRef();

    const { update } = useFirestore();

    useFirestoreConnect([
        { collection: `subscribers`, doc: id, storeAs: 'subscriber' }
    ]);
    const subscriber = useSelector(({ firestore: { ordered } }) => ordered.subscriber && ordered.subscriber[0]);
    
    if (!subscriber) return <Loading/>;

    const updateSubscriber = e => {
        e.preventDefault();

        const updatedSubscriber = { 
            name: name.current.value,
            lastname: lastname.current.value,
            code: code.current.value,
            career: career.current.value
        };

        update({
            collection: 'subscribers',
            doc: id            
        }, updatedSubscriber)
        .then(history.push('/subscribers'))
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
                    <i className="fas fa-user"></i> Edit Subscriber
                </h2>
                <div className="row justify-content-center">
                    <div className="col-md-8 mt-5">
                        <form onSubmit={ updateSubscriber }>
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    id="name" 
                                    className="form-control" 
                                    placeholder="Subscriber's Name" 
                                    defaultValue={ subscriber.name }
                                    ref={ name }
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
                                    defaultValue={ subscriber.lastname }
                                    ref={ lastname }
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
                                    defaultValue={ subscriber.career }
                                    ref={ career }
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
                                    defaultValue={ subscriber.code }
                                    ref={ code }
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                <i className="fas fa-user-plus"></i> Edit Subscriber
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

UpdateSubscriber.propType = {
    firestore: PropTypes.object.isRequired
}