import axios from 'axios';

import {LOGIN_SUCCESS} from '../types';

export const loginUser = user => dispatch => {
    return axios.post("/users/login", {user: user})
        .then(res => res.data)
        .then(data => {
            const user = {id: data._id, email: data.email};

            const jwt = data.token;
            axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
            dispatch({type:LOGIN_SUCCESS, payload: user})
        })
        .catch(err => err)
    }

export const loginFromSession = () => dispatch => {
    return axios.get('/users/login')
        .then(res => res.data)
        .then(data => {
            const user = {id: data._id, email: data.email};

            const jwt = data.token;
            axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
            dispatch({type:LOGIN_SUCCESS, payload: user})
        })
        .catch(err => err);
}