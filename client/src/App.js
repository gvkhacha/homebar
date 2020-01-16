import React from 'react';

import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';

import {AuthRoute} from './util/AuthRoute';

import LoginComponent from './components/LoginComponent';
import Home from './components/Home'


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login'><LoginComponent /></Route>
        <AuthRoute path='/' component={Home}></AuthRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
