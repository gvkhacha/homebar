import React from 'react';

import Layout from '../Layout';
import Dashboard from './Dashboard';
import DrinkCard from '../DrinksPage/DrinkCard';

import Drink from '../../util/Drink';

const Home = () => {
    const ingr = [{name: 'cognac', quantity: 2}, {name: 'lemon juice', quantity: 0.75}, {name: 'triple sec', quantity: 0.75}];

    const TEST = new Drink("", "Cognac Sidecar", "http://placehold.it/250x250", ingr, ["Add all ingredients to shaker filled with ice", "Shake for 10 seconds", "Strain into coupe glass"], "Coupe")
    return (
        <Layout>
            <Dashboard />
            <DrinkCard drink={TEST} admin={true} />
        </Layout>
    )
}

export default Home;