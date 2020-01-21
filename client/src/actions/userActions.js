import axios from 'axios';

import {pendingTask, begin, end} from 'react-redux-spinner';
import {LOGIN_SUCCESS, LOGOUT} from '../types';

export const loginUser = user => dispatch => {
    dispatch({type: '', [pendingTask]: begin});
    return axios.post("/users/login", {user: user})
        .then(res => res.data)
        .then(data => {
            const user = {id: data._id, email: data.email};

            const jwt = data.token;
            axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
            localStorage.setItem("hb_jwt", jwt);
            dispatch({type:LOGIN_SUCCESS, payload: user, [pendingTask]: end})
        })
        .catch(err => err);
    }

export const restoreSession = () => dispatch => {
    const jwt = localStorage.getItem("hb_jwt");
    if(jwt){
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
        return axios.get("/users/login")
            .then(res => res.data)
            .then(data => {
                const user = {id: data._id, email: data.email};
                dispatch({type:LOGIN_SUCCESS, payload: user})
            })
    }
    return new Promise((resolve) => {
        resolve({success: false, message: "No session saved. Please login"});
    })
}

export const logoutUser = () => dispatch => {
    localStorage.removeItem("hb_jwt");
    delete axios.defaults.headers.common["Authorization"];
    dispatch({type: LOGOUT})
    return axios.get('/users/logout');
}