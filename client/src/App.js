import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

import {
  BrowserRouter,
  Switch,
  Route,
  useHistory,
  Link
} from 'react-router-dom';
import {AuthRoute} from './util/AuthRoute';

import {useSelector, useDispatch} from 'react-redux';
import {loginUser} from './actions/userActions';

const LoginComponent = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const login = () => {
    const u = {
      name: "Test",
      email: "test@gmail.com",
      password: "123abc"
    }
    dispatch(loginUser(u));
    history.push('/');
  }

  return (
    <div>Login Component
      <button onClick={login}>Login</button>
      <Link to='/'>Test</Link>
    </div>
  )
}

const Home = () => {
  return (
    <div>Home Component</div>
  )
}


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
