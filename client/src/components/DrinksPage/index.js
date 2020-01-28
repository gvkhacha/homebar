import React from 'react';
import { useEffect, useState } from 'react';

import axios from 'axios';

import Drink from '../../util/Drink';
import DrinkCard from './DrinkCard';
import Layout from '../Layout';

const DrinksPage = () => {
    const [drinks, setDrinks] = useState([]);

    useEffect(() => {
        axios.get('/drink')
            .then(resp => resp.data)
            .then(data => {
                console.log(data);
                if(data){
                    setDrinks(data.map(obj => {
                        return new Drink(obj.name, obj.img, obj.ingredients, obj.steps, obj.glassware);
                    }))
                }
            })
    }, [])

    return (
        <Layout>
            {drinks.map(d => (
                <DrinkCard drink={d} admin={false} key={d.name + "_CARD"} />
            ))}
        </Layout>
    )
}

export default DrinksPage;