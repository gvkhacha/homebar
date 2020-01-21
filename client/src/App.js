import React from 'react';

import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';

import {AuthRoute} from './util/AuthRoute';
import {Spinner} from './util/Spinner';

import LoginComponent from './components/LoginComponent';
import Home from './components/Home'


import './sass/style.scss'

function App() {
  return (
    <>
    <Spinner />
    <BrowserRouter>
      <Switch>
        <Route path='/login'><LoginComponent /></Route>
        <AuthRoute path='/' component={Home}></AuthRoute>
      </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;
