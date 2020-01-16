import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase';

import Loading from '../Layout/Loading';
import SubscriberCard from '../Subscribers/SubscriberCard';

// REDUX ACTIONS
import { searchUser } from '../../redux/actions/searchUserAction';
import Alert from '../Layout/Alert';

export default function LendBook({ match: { params: { id } }, history }) {
    useFirestoreConnect([
        { collection: `books`, doc: id, storeAs: 'book' }
    ], searchUser);
    const book = useSelector(({ firestore: { ordered } }) => ordered.book && ordered.book[0]);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch(); 
    
    const { collection, update } = useFirestore();
    
    const [ID, setID] = useState('');
    const [result, setResult] = useState(true);

    if (!book) return <Loading/>;

    const readID = e => setID(e.target.value);

    const searchStudent = e => {
        e.preventDefault();

        const subscribers = collection('subscribers');
        const query = subscribers.where('code', '==', ID).get();

        query
            .then(resp => {
                if (resp.empty) {
                    setResult(false);
                    dispatch(searchUser({}));                    
                } else {
                    const data = resp.docs[0];
                    dispatch(searchUser(data.data()));
                    setResult(true);
                }
            })
            .catch(err => console.error(err));
    };

    const requestLoan = () => {
        user.request_date = new Date().toLocaleDateString();

        const updatedBook = book;

        updatedBook.borrowed.push(user);

        update({
            collection: 'books',
            doc: updatedBook.id
        }, updatedBook).then(history.push('/books'))
                       .catch(err => console.error(err));
                       
        dispatch(searchUser({}));
    };

    let cardSubscriber, btnRequest, alert;

    if (user.name) {
        cardSubscriber = <SubscriberCard student={ user }/>;
        btnRequest = <button 
                        className="btn btn-info btn-block"
                        onClick={ requestLoan }
                    >
                        <i className="fas fa-sign-in-alt"></i> Request Loan
                    </button>;
    } else {
        cardSubscriber = null;
        btnRequest = null;        
    }

    if (result) {
        alert = null;
    } else {
        alert = <Alert msg="There are not students with that ID"/>;
    }

    return (
        <div className="row">
            <div className="col-12 mb-4">
                <Link to='/books' className="btn btn-secondary">
                    <i className="fas fa-arrow-circle-left"></i> Go Back
                </Link>
            </div>
            <div className="col-12">
                <h2>
                    <i className="fas fa-address-book"></i> Request Loan: { book.title }
                </h2>
                <div className="row justify-content-center mt-5">
                    <div className="col-md-8">
                        <form onSubmit={ searchStudent } className="mb-4">
                            <legend className="color-primary text-center">
                                Search Subscriber by ID
                            </legend>
                            <div className="form-group">
                                <input 
                                    type="text"
                                    name="id"
                                    className="form-control"
                                    onChange={ readID }
                                />
                            </div>
                            <button type="submit" className="btn btn-success btn-block">
                                <i className="fas fa-search"></i> Search
                            </button>
                        </form>
                        { alert }
                        { cardSubscriber }
                        { btnRequest }
                    </div>
                </div>
            </div>
        </div>
    );
}

LendBook.propType = {
    firestore: PropTypes.object.isRequired
}