import React from 'react';
import {
  Route,
  Redirect
} from 'react-router-dom';

import {useSelector} from 'react-redux';

export const AuthRoute = ({component: Component, ...rest}) => {
    const user = useSelector(state => state.user);

    if(user.loggedIn){
        return (
            <Route {...rest} component={Component} />
        )
    }else{
        return (
            <Redirect to={{
                pathname: '/login',
                state: {ref: rest.location}
            }} />
        )
    }
}