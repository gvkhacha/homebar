import React from 'react';
import axios from 'axios';

import {useDispatch} from 'react-redux';

import {logoutUser} from '../../actions/userActions';


const Home = () => {
  const dispatch = useDispatch();

  const test = () => {
    axios.get('/users/test').then(res => console.log(res));
  }

  const logout = () => {
    dispatch(logoutUser())
  }

    return (
        <div>Home Component
          <button onClick={test}>Test</button>
          <button onClick={logout}>Log Out</button>
        </div>
      )
}

export default Home;