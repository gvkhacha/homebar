import {LOGIN_SUCCESS} from '../types';

const initialState = {
    user: null,
};

export default function(state=initialState, action){
    switch(action.type){
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
}