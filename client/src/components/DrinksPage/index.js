import React from 'react';
import { useEffect, useState } from 'react';

import axios from 'axios';

import Drink from '../../util/Drink';
import DrinkCard from './DrinkCard';
import DrinkFilter from './DrinkFilter';
import Layout from '../Layout';

const ListDrinks = ({drinks}) => {
    return (
        <div>
            {drinks.map(d => (
                <DrinkCard drink={d} admin={false} key={d.name + "_CARD"} />
            ))}
        </div>
    )
}

const DrinksPage = () => {
    const [drinks, setDrinks] = useState([]);
    const [alcFilter, setFilter] = useState('all');

    useEffect(() => {
        axios.get('/drink')
            .then(resp => resp.data)
            .then(data => {
                console.log(data);
                if(data){
                    setDrinks(data.map(obj => {
                        return new Drink(obj._id, obj.name, obj.img, obj.ingredients, obj.steps, obj.glassware);
                    }))
                }
            })
    }, [])

    return (
        <Layout>
            <DrinkFilter alc={alcFilter} setFilter={setFilter} />
            <ListDrinks drinks={drinks.filter(d => {
                if(alcFilter === 'all') return true;
                
                for(let i = 0; i<d.ingredients.length; i++){
                    if(d.ingredients[i].name.toLowerCase().includes(alcFilter)){
                        return true;
                    }
                }
                return false;
            })} />
        </Layout>
    )
}

export default DrinksPage;