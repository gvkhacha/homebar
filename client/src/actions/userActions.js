import axios from 'axios';

import {LOGIN_SUCCESS} from '../types';

export const loginUser = user => dispatch => {
    axios.post("http://10.0.1.25:3001/users/login", {user: user})
        .then(res => res.data)
        .then(data => {
            const user = {id: data._id, email: data.email};

            const jwt = data.token;
            axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
            dispatch({type:LOGIN_SUCCESS, payload: user})
        })
}