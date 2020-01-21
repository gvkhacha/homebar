import React from 'react';
import {useSelector} from 'react-redux';

/*
For some reason, react-redux-spinner component wasn't working properly,
but the state was changing - Just wrote this quick component to be in <App>
*/
export const Spinner = () => {

    const tasks = useSelector((state) => state.pendingTasks);

    if(tasks > 0){
        return (
            <div class="loading"></div>
        )
    }else{
        return (
            <div></div>
        )
    }
}