import React from 'react';
import Routes from './Routes';

// React Redux Firebase
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { Provider } from 'react-redux';
import store, { rrfProps } from './redux/store';
import AuthIsLoaded from './components/Auth/AuthIsLoaded';


function App() {
  return (
    <Provider store={ store }>
      <ReactReduxFirebaseProvider { ...rrfProps }>
        <AuthIsLoaded>
          <Routes/>
        </AuthIsLoaded>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default App;
