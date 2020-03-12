import {combineReducers} from 'redux';
import userReducer from './userReducer';
import orderReducer from './orderReducer';

import {pendingTasksReducer} from 'react-redux-spinner';

export default combineReducers({
    user: userReducer,
    orders: orderReducer,
    pendingTasks: pendingTasksReducer,
});