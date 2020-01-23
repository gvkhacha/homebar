import {LOGIN_SUCCESS, LOGOUT} from '../types';

const initialState = {
    email: '',
    id: '',
    name: '',
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
        case LOGOUT:
            return {
                ...state,
                email: '',
                id: '',
                loggedIn: false
            };
        default:
            return state;
    }
}