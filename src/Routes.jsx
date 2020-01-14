import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import Subscribers from './components/Subscribers/Subscribers';
import NewSubscriber from './components/Subscribers/NewSubscriber';
import UpdateSubscriber from './components/Subscribers/UpdateSubscriber';
import ShowSubscriber from './components/Subscribers/ShowSubscriber';
import Navbar from './components/Layout/Navbar';

function Routes() {
  return (
    <Router>
      <Navbar/>
      <div className="container">
        <Switch>
            <Route exact path='/subscribers' component={ Subscribers }/>
            <Route exact path='/subscriber/new' component={ NewSubscriber }/>
            <Route exact path='/subscriber/show/:id' component={ ShowSubscriber }/>
            <Route exact path='/subscriber/edit/:id' component={ UpdateSubscriber }/>
        </Switch>
      </div>
    </Router>
  );
}

export default Routes;
