import React from 'react';
import Routes from './Routes';

// React Redux
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { Provider } from 'react-redux';
import store, { rrfProps } from './redux/store';

function App() {
  return (
    <Provider store={ store }>
      <ReactReduxFirebaseProvider { ...rrfProps }>
        <Routes/>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default App;
