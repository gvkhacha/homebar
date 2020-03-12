import React from 'react';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentOrders } from '../../actions/drinkActions';

import Layout from '../Layout';
import Dashboard from './Dashboard';
import DrinkCard from '../DrinksPage/DrinkCard';

const Home = () => {
    const currentDrinks = useSelector(state => state.orders.orders);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCurrentOrders())
    }, [dispatch])

    let count = 0;
    return (
        <Layout>
            <Dashboard />
            {currentDrinks.map(d => (
                <DrinkCard drink={d} admin={true} key={d.id + count++} />
            ))}
        </Layout>
    )
}

export default Home;