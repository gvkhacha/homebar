import axios from 'axios';

import { pendingTask, begin, end } from 'react-redux-spinner';
import { ADD_ORDER, REMOVE_ORDER } from '../types';
import Drink from '../util/Drink';

export const getCurrentOrders = () => dispatch => {
    return axios.get("/drink/order")
        .then(res => res.data)
        .then(data => {
            const drinks = data.map(d => {
                return new Drink(d._id, d.name, d.img, d.ingredients, d.steps, d.glassware);
            })
            dispatch({ type: ADD_ORDER, payload: drinks});
        })
}

export const addOrder = id => dispatch => {
    dispatch({ type: '', [pendingTask]: begin });
    return axios.post(`/drink/order/${id}`)
        .then(res => res.data)
        .then(data => {
            const drinks = data.map(d => {
                return new Drink(d._id, d.name, d.img, d.ingredients, d.steps, d.glassware);
            })
            dispatch({ type: ADD_ORDER, payload: drinks, [pendingTask]: end });
        })
}

export const removeOrder = id => dispatch => {
    dispatch({type: '', [pendingTask]: begin});
    return axios.delete(`/drink/order/${id}`)
        .then(res => res.data)
        .then(data => {
            const drinks = data.map(d => {
                return new Drink(d._id, d.name, d.img, d.ingredients, d.steps, d.glassware);
            })
            console.log(drinks);
            dispatch({ type: REMOVE_ORDER, payload: drinks, [pendingTask]: end });
        })
}
