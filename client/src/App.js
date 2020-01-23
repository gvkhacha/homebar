import React from 'react';

import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';

import {AuthRoute} from './util/AuthRoute';
import {Spinner} from './util/Spinner';

import LoginComponent from './components/LoginComponent';
import Home from './components/Home';
import Admin from './components/Admin';


import './sass/style.scss'

function App() {
  return (
    <>
    <Spinner />
    <BrowserRouter>
      <Switch>
        <Route path='/login'><LoginComponent /></Route>
        <AuthRoute path='/admin' component={Admin}></AuthRoute>
        <Route path='/'><Home /></Route>
      </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;
