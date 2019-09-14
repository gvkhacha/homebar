import React, { useState, useEffect } from 'react';
import { DefaultButton, TextField, Stack, Dropdown, Label, ComboBox } from 'office-ui-fabric-react';
import axios from 'axios';

import Ingredient from './models/Ingredient';

const glassOptions = [
    { key: 'rocks', text: 'Rocks Glass' },
    { key: 'highball', text: 'Highball' },
    { key: 'martini', text: 'Martini' },
    { key: 'shot', text: 'Shot Glass' },
    { key: 'coupe', text: 'Coupe' },
    { key: 'mule', text: 'Mule Mug' }
];

const DrinkAdmin = () => {
    const [name, setName] = useState("Old Fashioned");
    const [url, setUrl] = useState("https://cdn.liquor.com/wp-content/uploads/2018/05/08113350/bourbon-old-fashioned-720x720-recipe.jpg");
    const [instructions, setInstructions] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [allIngr, setAllIngr] = useState([]);
    const [glassware, setGlassware] = useState('rocks');

    useEffect(() => {
        axios.get('http://localhost:3001/ingredients')
            .then(result => {
                setAllIngr(result.data.filter(i => i.name)
                    .map((ingr) => {
                    ingr.key = ingr._id;
                    ingr.text = ingr.name;
                    return ingr;
                }).sort((a, b) => a.name <= b.name ? -1 : 1))
            });
    }, [])

    const columnProps = {
        tokens: { childrenGap: 15 },
        styles: { root: { width: 300 } }
    };

    const removeIngr = (ing) => {
        setIngredients(ingredients.filter(i => i.key !== ing.key));
    }

    const onIngrChange = (ev, op) => {
        if (op !== undefined) {
            if (op.selected) {
                setIngredients(ingredients.concat([op]));
            } else {
                setIngredients(ingredients.filter((i) => i.key !== op.key));
            }
        }
    }

    const submitDrink = () => {
        var recipe = {
            name: name,
            imageUrl: url,
            ingredients: ingredients.map(ing => {
                return {ingredient: ing,
                amount: ingrAmount[ing.key]}
            }),
            instructions: instructions.split('\n').filter(i => i !== ''),
            glass: glassware
        }
        axios.post('http://localhost:3001/recipe', recipe)
            .then(() => {
                setName('');
                setUrl('');
                setIngredients([]);
                setInstructions('');
                setGlassware('');
            }).catch(() => {
                console.log("ERROR");
                console.log(recipe);
            })
    }

    let ingrAmount = {};

    const amountChange = (id, val) => {
        ingrAmount[id] = val;
    }


    return (
        <Stack {...columnProps}>
            <TextField label="Drink Name" value={name} onChange={(e, v) => setName(v)} />
            <TextField label="Image URL" value={url} onChange={(e, v) => setUrl(v)} />
            <Dropdown
                label="Glassware"
                defaultSelectedKey="rocks"
                options={glassOptions}
                onChange={(e, o) => setGlassware(o.key)}
            />
            <TextField label="Instructions" multiline rows={3} value={instructions} onChange={(e, v) => setInstructions(v)} />
            <Label>Ingredients</Label>
            <ComboBox
                multiSelect
                label="Add Ingredient"
                allowFreeform={false}
                autoComplete={'on'}
                options={allIngr}
                onChange={onIngrChange}
            />
            {ingredients.map(ing => 
                <Stack horizontal key={"stack" + ing.key}>
                    <TextField key={"amt" + ing.key} onChange={(e) => amountChange(ing.key, e.target.value)} 
                        styles={{ root: { width: '100px' } }}/>
                    <Ingredient key={ing.key} ing={ing} removeIngr={() => removeIngr(ing)} isAdmin={true} />)
                </Stack>
            )}
            <DefaultButton text="Add Recipe" onClick={submitDrink} />
        </Stack>
    )
}


export default DrinkAdmin;