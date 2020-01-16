import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import Subscribers from './components/Subscribers/Subscribers';
import NewSubscriber from './components/Subscribers/NewSubscriber';
import UpdateSubscriber from './components/Subscribers/UpdateSubscriber';
import ShowSubscriber from './components/Subscribers/ShowSubscriber';
import Navbar from './components/Layout/Navbar';

import Books from './components/Books/Books';
import NewBook from './components/Books/NewBook';
import ShowBook from './components/Books/ShowBook';
import UpdateBook from './components/Books/UpdateBook';
import LendBook from './components/Books/LendBook';
import Login from './components/Auth/Login';
import PrivateRoute from './components/Auth/PrivateRoute';
import PublicRoute from './components/Auth/PublicRoute';

function Routes() {
  return (
    <Router>
      <Navbar/>
      <div className="container">
        <Switch>
            <Route exact path='/' component={ PublicRoute(Login) }/>
            <Route exact path='/login' component={ PublicRoute(Login) }/>
            <PrivateRoute>
              <Route exact path='/books' component={ Books }/>
              <Route exact path='/book/new' component={ NewBook }/>
              <Route exact path='/book/show/:id' component={ ShowBook }/>
              <Route exact path='/book/edit/:id' component={ UpdateBook }/>
              <Route exact path='/book/lend/:id' component={ LendBook }/>
              
              <Route exact path='/subscribers' component={ Subscribers }/>
              <Route exact path='/subscriber/new' component={ NewSubscriber }/>
              <Route exact path='/subscriber/show/:id' component={ ShowSubscriber }/>
              <Route exact path='/subscriber/edit/:id' component={ UpdateSubscriber }/>
            </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}

export default Routes;
