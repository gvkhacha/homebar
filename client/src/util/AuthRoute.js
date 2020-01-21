import React from 'react';
import {useDispatch} from 'react-redux';

import {
  Route,
  Redirect
} from 'react-router-dom';

import {useSelector} from 'react-redux';

import {restoreSession} from '../actions/userActions';


export const AuthRoute = ({component: Component, ...rest}) => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);
    const jwt = localStorage.getItem("hb_jwt");
    if(jwt && !user.loggedIn){
        dispatch(restoreSession());
    }

    if(jwt || user.loggedIn){
        return (
            <Route {...rest} component={Component} />
        )
    }else{
        return (
            <Redirect to='/login' />
        )
    }
}