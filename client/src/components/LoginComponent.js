import React from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import {loginUser} from '../actions/userActions';

const LoginComponent = () => {
    const history = useHistory();
    const dispatch = useDispatch();
  
    const login = () => {
      const u = {
        name: "Test",
        email: "test@gmail.com",
        password: "123abc"
      }
      dispatch(loginUser(u)).then(() => {
        history.push('/');
      })
    }

    return (
        <div>Login Component
          <button onClick={login}>Login</button>
        </div>
      )
}

export default LoginComponent;