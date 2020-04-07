import axios from 'axios';

import {pendingTask, begin, end} from 'react-redux-spinner';
import {LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT} from '../types';

import {saveState, deleteState} from '../util/restore';

export const loginUser = user => dispatch => {
    dispatch({type: '', [pendingTask]: begin});
    return axios.post("/users/login", {user: user})
        .then(res => res.data)
        .then(data => {
            const user = {id: data._id, email: data.email};

            saveState(user);
            dispatch({type:LOGIN_SUCCESS, payload: user, [pendingTask]: end})
        })
        .catch(err => {
            dispatch({type:LOGIN_FAIL, [pendingTask]: end})
            return err;
        });
    }

export const restoreSession = () => dispatch => {
    return axios.get("/users/login").then(resp =>{
        if(resp.status === 200){
            const user = resp.data;

            saveState(user);
            dispatch({type: LOGIN_SUCCESS, payload: user});
        }
    }).catch(() => {});
}

export const logoutUser = () => dispatch => {
    deleteState();
    dispatch({type: LOGOUT})
    return axios.get('/users/logout');
}