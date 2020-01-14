import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

import Loading from '../Layout/Loading';

export default function ShowSubscriber({ match: { params: { id } } }) {
    useFirestoreConnect([
        { collection: `subscribers`, doc: id, storeAs: 'subscriber' }
    ]);
    const subscriber = useSelector(({ firestore: { ordered } }) => ordered.subscriber && ordered.subscriber[0]);

    if (!subscriber) return <Loading/>;
    return (
        <div className="row">
            <div className="col-md-6 mb-4">
                <Link to='/subscribers' className="btn btn-secondary">
                    <i className="fas fa-arrow-circle-left"></i> Go Back
                </Link>
            </div>
            <div className="col-md-6">
                <Link to={`/subscriber/edit/${ id }`} className="btn btn-info float-right">
                    <i className="fas fa-pencil-alt"></i> Edit Subscriber
                </Link>
            </div>
            <hr className="mx-8 w-100"/>
            <div className="col-12">
                <h2 className="mb-4"> { subscriber.name } { subscriber.lastname } </h2>
                <p>
                    <span className="font-weight-bold">
                        Career: {''}
                    </span>
                    { subscriber.career }
                </p>
                <p>
                    <span className="font-weight-bold">
                        ID: {''}
                    </span>
                    { subscriber.code }
                </p>

            </div>
        </div>
    );
}

ShowSubscriber.propType = {
    firestore: PropTypes.object.isRequired
}