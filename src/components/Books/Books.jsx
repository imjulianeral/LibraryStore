import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase';

import Loading from '../Layout/Loading';

export default function Books() {
    useFirestoreConnect([
        { collection: 'books' }
    ]);
    const books = useSelector(state => state.firestore.ordered.books);
    const firestore = useFirestore();

    if (!books) return <Loading/>;

    const deleteBook = id => {
        firestore.delete({
            collection: 'books',
            doc: id
        });
    };

    return (
        <div className="row">
            <div className="col-md-12 mb-4">
                <Link to='/book/new' className="btn btn-success">
                    <i className="fas fa-plus"></i> Add New Book
                </Link>
            </div>
            <div className="col-md-8">
                <h1>
                    <i className="fas fa-book"></i> Books
                </h1>
            </div>
            <table className="table table-striped mt-4">
                <thead className="text-light bg-primary">
                    <tr>
                        <th>ISBN</th>
                        <th>Title</th>
                        <th>Editorial</th>
                        <th>Stock</th>
                        <th>Availables</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { books.map(book => (
                        <tr key={ book.id }>
                            <td>{ book.ISBN }</td>
                            <td>{ book.title }</td>
                            <td>{ book.editorial }</td>
                            <td>{ book.stock }</td>
                            <td>{ book.stock - book.borrowed.length }</td>
                            <td>
                                <Link to={ `/book/show/${ book.id }` } className="btn btn-success">
                                    <i className="fas fa-eye"></i> View
                                </Link>
                                <button className="btn btn-danger ml-2" onClick={ () => deleteBook(book.id) }>
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

Books.propTypes = {
    firestore: PropTypes.object,
    subscribers: PropTypes.array
}