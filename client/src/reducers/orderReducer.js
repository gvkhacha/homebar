import { ADD_ORDER, REMOVE_ORDER } from '../types';

const initialState = {
    orders: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_ORDER:
            return {
                ...state,
                orders: action.payload
            }
        case REMOVE_ORDER:
            return {
                ...state,
                orders: action.payload
            };
        default:
            return state;
    }
}