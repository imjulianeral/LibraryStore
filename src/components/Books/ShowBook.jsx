import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase';

import Loading from '../Layout/Loading';

export default function ShowBook({ match: { params: { id } } }) {
    useFirestoreConnect([
        { collection: `books`, doc: id, storeAs: 'book' }
    ]);
    const book = useSelector(({ firestore: { ordered } }) => ordered.book && ordered.book[0]);

    const { update } = useFirestore();

    if (!book) return <Loading/>;

    let btnLend;
    if (book.stock - book.borrowed.length > 0) {
        btnLend =   <Link to={`/book/lend/${ book.id }`} className="btn btn-warning">
                        <i class="fas fa-sign-out-alt"></i> Request Loan
                    </Link>;
    } else {
        btnLend = null;
    }
    
    const returnBook = id => {
        const updatedBook = { ...book };
        const borrowed = book.borrowed.filter(element => element.code !== id);
        
        updatedBook.borrowed = borrowed;

        update({
            collection: 'books',
            doc: updatedBook.id
        }, updatedBook);
    }

    return (
        <div className="row">
            <div className="col-md-6 mb-4">
                <Link to='/books' className="btn btn-secondary">
                    <i className="fas fa-arrow-circle-left"></i> Go Back
                </Link>
            </div>
            <div className="col-md-6">
                <Link to={`/book/edit/${ id }`} className="btn btn-info float-right">
                    <i className="fas fa-pencil-alt"></i> Edit Book
                </Link>
            </div>
            <hr className="mx-8 w-100"/>
            <div className="col-12">
                <h2 className="mb-4"> { book.title } </h2>
                <p>
                    <span className="font-weight-bold">
                        Editorial: {''}
                    </span>
                    { book.editorial }
                </p>
                <p>
                    <span className="font-weight-bold">
                        ISBN: {''}
                    </span>
                    { book.ISBN }
                </p>
                <p>
                    <span className="font-weight-bold">
                        Stock: {''}
                    </span>
                    { book.stock }
                </p>
                <p>
                    <span className="font-weight-bold">
                        Availables: {''}
                    </span>
                    { book.stock - book.borrowed.length}
                </p>
                { btnLend }

                <div className="row">
                    { book.borrowed.map(borrow => (
                        <div key={ borrow.code } class="card bg-dark mb-3 mt-5 mx-2 col-md">
                            <h4 class="card-header card-title text-white">Has Been Borrowed to:</h4>
                            <div class="card-body">
                                <p className="font-weight-bold text-white">
                                    Name: 
                                    <span className="font-weight-normal"> { borrow.name } </span>
                                </p>
                                <p className="font-weight-bold text-white">
                                    ID: 
                                    <span className="font-weight-normal"> { borrow.code } </span>
                                </p>
                                <p className="font-weight-bold text-white">
                                    Career: 
                                    <span className="font-weight-normal"> { borrow.career } </span>
                                </p>
                                <p className="font-weight-bold text-white">
                                    Request Date: 
                                    <span className="font-weight-normal"> { borrow.request_date } </span>
                                </p>
                            </div>
                            <div className="card-footer">
                                <button
                                    className="btn btn-success font-weight-bold btn-block"
                                    onClick={ () => returnBook(borrow.code) }
                                >
                                    <i class="fas fa-undo"></i> Return book
                                </button>
                            </div>
                        </div>
                    )) }
                </div>
            </div>
        </div>
    );
}

ShowBook.propType = {
    firestore: PropTypes.object.isRequired
}