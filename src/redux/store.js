import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer, createFirestoreInstance } from 'redux-firestore';
import thunk from 'redux-thunk';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/analytics';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAzc79B9rPFdulCvAHueJGlC1AqyzgZ-6g",
    authDomain: "library-160c7.firebaseapp.com",
    databaseURL: "https://library-160c7.firebaseio.com",
    projectId: "library-160c7",
    storageBucket: "library-160c7.appspot.com",
    messagingSenderId: "1058592225053",
    appId: "1:1058592225053:web:824a20e9d76a913320d3f4",
    measurementId: "G-2B9PNX7P6R"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();
firebase.analytics();

// React-Redux configuration.
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true
};

// Reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer
});

// Setting thunk in a middlewares array
const middlewares = [ thunk ];

// Initial State
const initialState = {};

// Create Store
const store = createStore(
    rootReducer, 
    initialState,
    compose(applyMiddleware(...middlewares), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

export const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance
}

export default store;