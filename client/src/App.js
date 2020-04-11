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
import DrinksPage from './components/DrinksPage';


import './sass/style.scss'
import IngredientAdmin from './components/Admin/IngredientAdmin';

function App() {
  return (
    <>
    <Spinner />
    <BrowserRouter>
      <Switch>
        <AuthRoute path='/admin/ingredients' component={IngredientAdmin}></AuthRoute>
        <AuthRoute path='/admin' component={Admin}></AuthRoute>
        <Route path='/login'><LoginComponent /></Route>
        <Route path='/drinks'><DrinksPage /></Route>
        <Route path='/'><Home /></Route>
      </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;
