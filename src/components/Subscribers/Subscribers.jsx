import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase';

import Loading from '../Layout/Loading';

export default function Subscribers() {
    useFirestoreConnect([
        { collection: 'subscribers' }
    ]);
    const subscribers = useSelector(state => state.firestore.ordered.subscribers);
    const firestore = useFirestore();

    if (!subscribers) return <Loading/>;

    const deleteSubscriber = id => {
        firestore.delete({
            collection: 'subscribers',
            doc: id
        });
    };

    return (
        <div className="row">
            <div className="col-md-12 mb-4">
                <Link to='/subscriber/new' className="btn btn-primary">
                    <i className="fas fa-plus"></i> Add New Subscriber
                </Link>
            </div>
            <div className="col-md-8">
                <h1>
                    <i className="fas fa-users"></i> Subscribers
                </h1>
            </div>

            <table className="table table-striped mt-4">
                <thead className="text-light bg-primary">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Career</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { subscribers.map(subscriber => (
                        <tr key={ subscriber.id }>
                            <td>{ subscriber.code }</td>
                            <td>{ subscriber.name } { subscriber.lastname }</td>
                            <td>{ subscriber.career }</td>
                            <td>
                                <Link to={ `/subscriber/show/${ subscriber.id }` } className="btn btn-success">
                                    <i className="fas fa-eye"></i> View
                                </Link>
                                <button className="btn btn-danger ml-2" onClick={ () => deleteSubscriber(subscriber.id) }>
                                    <i className="fas fa-trash-alt"></i> Delete
                                </button>
                            </td>
                        </tr>
                    )) }
                </tbody>
            </table>
        </div>
    );
}

Subscribers.propTypes = {
    firestore: PropTypes.object,
    subscribers: PropTypes.array
}