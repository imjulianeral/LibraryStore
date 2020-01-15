import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useFirestore } from 'react-redux-firebase';

export default function NewBook({ history }) {
    const { collection } = useFirestore();

    const [fields, setFields] = useState({
        title: '',
        ISBN: '',
        stock: '',
        editorial: '',
        borrowed: []
    });

    const handleChange = e => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        });
    }

    const addBook = e => {
        e.preventDefault();

        const bookData = { ...fields };

        collection('books').add(bookData)
            .then(() => history.push('/books'))
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
                    <i className="fas fa-book-medical"></i> New Book
                </h2>
                <div className="row justify-content-center">
                    <div className="col-md-8 mt-5">
                        <form onSubmit={ addBook }>
                            <div className="form-group">
                                <label htmlFor="title">Title:</label>
                                <input 
                                    type="text" 
                                    name="title" 
                                    id="title" 
                                    className="form-control" 
                                    placeholder="Book's Title" 
                                    value={ fields.title }
                                    onChange={ handleChange }
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
                                    value={ fields.ISBN }
                                    onChange={ handleChange }
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
                                    value={ fields.stock }
                                    onChange={ handleChange }
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
                                    value={ fields.editorial }
                                    onChange={ handleChange }
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-success float-right">
                                <i className="fas fa-book-medical"></i>  Add New Book
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

NewBook.propType = {
    firestore: PropTypes.object.isRequired
}