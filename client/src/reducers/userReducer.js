import {LOGIN_SUCCESS} from '../types';

const initialState = {
    email: '',
    id: '',
    loggedIn: false
};

export default function(state=initialState, action){
    switch(action.type){
        case LOGIN_SUCCESS:
            return {
                ...state,
                email: action.payload.email,
                id: action.payload.id,
                loggedIn: true
            };
        default:
            return state;
    }
}