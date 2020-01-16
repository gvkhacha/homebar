import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';


import {useSelector, useDispatch} from 'react-redux';
import {loginUser} from './actions/userActions';



function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const login = () => {
    const u = {
      name: "Test",
      email: "test@gmail.com",
      password: "123abc"
    }
    dispatch(loginUser(u));
  }


  const testApi = () => {
    console.log(user);
    axios.get("http://10.0.1.25:3001/users/secure")
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"o
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={login}>Login</button>
        <button onClick={testApi}>Test</button>
      </header>
    </div>
  );
}

export default App;
