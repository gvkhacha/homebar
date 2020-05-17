import React from 'react';
import { useEffect, useState } from 'react';

import axios from 'axios';

import Drink from '../../util/Drink';
import DrinkCard from './DrinkCard';
import DrinkFilter from './DrinkFilter';
import Layout from '../Layout';


import Grid from '@material-ui/core/Grid';


function filterDrinks(drinks, alcFilter, onlyAvail, availableIngr){
    let filtered = drinks.filter(d => {
        if(alcFilter === 'all') return true;
        for(let i = 0; i<d.ingredients.length; i++){
            if(d.ingredients[i].name.toLowerCase().includes(alcFilter)){
                return true;
            }
        }
        return false;
    });

    if(onlyAvail){
        return filtered.filter(d => {
            for(let i=0; i<d.ingredients.length; i++){
                if(!availableIngr.includes(d.ingredients[i].name.toLowerCase())){
                    return false;
                }
            }

            return true;
        })
    }else{
        return filtered;
    }
}

const ListDrinks = ({drinks}) => {
    return (
        <Grid container spacing={2}>
            {drinks.map(d => (
                <DrinkCard drink={d} admin={false} key={d.name + "_CARD"} />
            ))}
        </Grid>
    )
}

const DrinksPage = () => {
    const [drinks, setDrinks] = useState([]);
    const [alcFilter, setFilter] = useState('all');
    const [onlyAvail, setOnlyAvail] = useState(true);
    const [availIngr, setAvailIngr] = useState([]);

    useEffect(() => {
        axios.get('/api/drink')
            .then(resp => resp.data)
            .then(data => {
                if(data){
                    setDrinks(data.map(obj => {
                        return new Drink(obj._id, obj.name, obj.img, obj.ingredients, obj.steps, obj.glassware);
                    }))
                }
            });
        
        axios.get("/api/ingredients/available")
            .then(resp => resp.data)
            .then(data => {
                if(data){
                    setAvailIngr(data.map(obj => {
                        return obj.name.toLowerCase();
                    }))
                }
            })
    }, [])

    return (
        <Layout>
            <DrinkFilter alc={alcFilter} setFilter={setFilter} onlyAvail={onlyAvail} toggleAvail={setOnlyAvail} />
            <ListDrinks drinks={filterDrinks(drinks, alcFilter, onlyAvail, availIngr)} />
        </Layout>
    )
}

export default DrinksPage;