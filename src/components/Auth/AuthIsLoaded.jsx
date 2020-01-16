import React from 'react';
import { useSelector } from 'react-redux'
import { isLoaded } from 'react-redux-firebase'

import Loading from '../Layout/Loading';

export default function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth);
  if (!isLoaded(auth)) return <Loading/>;
  return children;
}