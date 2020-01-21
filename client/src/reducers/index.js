import {combineReducers} from 'redux';
import userReducer from './userReducer';

import {pendingTasksReducer} from 'react-redux-spinner';

export default combineReducers({
    user: userReducer,
    pendingTasks: pendingTasksReducer,
});