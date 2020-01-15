import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase';

import Loading from '../Layout/Loading';

export default function UpdateBook({ match: { params: { id } }, history }) {
    const title = useRef();
    const editorial = useRef();
    const ISBN = useRef();
    const stock = useRef();

    const { update } = useFirestore();

    useFirestoreConnect([
        { collection: `books`, doc: id, storeAs: 'book' }
    ]);
    const book = useSelector(({ firestore: { ordered } }) => ordered.book && ordered.book[0]);
    
    if (!book) return <Loading/>;

    const updateBook = e => {
        e.preventDefault();

        const updatedBook = { 
            title: title.current.value,
            editorial: editorial.current.value,
            ISBN: ISBN.current.value,
            stock: stock.current.value
        };

        update({
            collection: 'books',
            doc: id            
        }, updatedBook)
        .then(history.push('/books'))
        .catch(err => console.error(err));
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
                    <i className="fas fa-book-medical"></i> Edit Book
                </h2>
                <div className="row justify-content-center">
                    <div className="col-md-8 mt-5">
                        <form onSubmit={ updateBook }>
                            <div className="form-group">
                                <label htmlFor="title">Title:</label>
                                <input 
                                    type="text" 
                                    name="title" 
                                    id="title" 
                                    className="form-control" 
                                    placeholder="Book's Title" 
                                    defaultValue={ book.title }
                                    ref={ title }
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="ISBN">ISBN:</label>
                                <input 
                                    type="text" 
                                    name="ISBN" 
                                    id="ISBN" 
                                    className="form-control" 
                                    placeholder="Book's ISBN" 
                                    defaultValue={ book.ISBN }
                                    ref={ ISBN }
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="stock">Stock:</label>
                                <input 
                                    type="number" 
                                    min="0"
                                    name="stock" 
                                    id="stock" 
                                    className="form-control" 
                                    placeholder="Book's Stock" 
                                    defaultValue={ book.stock }
                                    ref={ stock }
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="editorial">Editorial:</label>
                                <input 
                                    type="text" 
                                    name="editorial" 
                                    id="editorial" 
                                    className="form-control" 
                                    placeholder="Book's Editorial" 
                                    defaultValue={ book.editorial }
                                    ref={ editorial }
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-success float-right">
                                <i className="fas fa-book"></i>  Edit Book
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

UpdateBook.propType = {
    firestore: PropTypes.object.isRequired
}