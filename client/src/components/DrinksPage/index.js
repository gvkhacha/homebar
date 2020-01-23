import React from 'react';

import Drink from '../../util/Drink';
import DrinkCard from './DrinkCard';
import Layout from '../Layout';

const DrinksPage = () => {
    const ingr = [{name: 'cognac', quantity: 2}, {name: 'lemon juice', quantity: 0.75}, {name: 'triple sec', quantity: 0.75}];

    const TEST = new Drink("Cognac Sidecar", "http://placehold.it/250x250", ingr, ["Add all ingredients to shaker filled with ice", "Shake for 10 seconds", "Strain into coupe glass"], "Coupe")
    
    return (
        <Layout>
            <DrinkCard drink={TEST} admin={false}/>
        </Layout>
    )
}

export default DrinksPage;