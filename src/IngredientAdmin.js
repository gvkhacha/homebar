import React, { useState, useEffect } from 'react';
import { DefaultButton, TextField, Stack } from 'office-ui-fabric-react';
import axios from 'axios';

import IngredientsList from './models/IngredientsList';

const IngredientAdmin = () => {
    const [name, setName] = useState("Vodka");
    const [allIngr, setAllIngr] = useState([]);

    const reloadIngr = () => {
        axios.get('http://localhost:3001/ingredients')
            .then(result => {
                setAllIngr(result.data.filter(i => i.name !== null)
                    .map((ingr) => {
                        ingr.key = ingr._id;
                        ingr.text = ingr.name;
                        return ingr;
                    }).sort((a, b) => a.name.trim() <= b.name.trim() ? -1 : 1))
            });
    }

    useEffect(reloadIngr, [])

    const removeIngr = (ing) => {
        axios.delete(`http://localhost:3001/ingredients/${ing._id}`)
            .then( () => {
                reloadIngr();
            })
    }

    const submitIngr = () => {
        if(name !== ''){
            axios.post(`http://localhost:3001/ingredients/${name}`)
                .then(() => {
                    setName('');
                    reloadIngr();
                }).catch(() => {
                    console.log("Failed to save", name);
                })
        }
    }

    const keyDown = (e)  => {
        if (e.keyCode === 13) {
            submitIngr();
        }
    }
    
    const columnProps = {
        tokens: { childrenGap: 15 },
        styles: { root: { width: 300 } }
    };


    return (
        <Stack {...columnProps}>
            <TextField label="Drink Name" value={name} onChange={(e, v) => setName(v)} onKeyDown={keyDown} />
            <DefaultButton text="Add Ingredient" onClick={submitIngr} />
            <IngredientsList isAdmin={true} ingrList={allIngr} removeIngr={removeIngr} />
        </Stack>
    )
}


export default IngredientAdmin;