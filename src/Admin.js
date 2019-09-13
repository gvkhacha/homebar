import React, { useState, useEffect } from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { ComboBox } from 'office-ui-fabric-react/lib/index';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import axios from 'axios';

const Ingredient = ({ name, removeIngr }) => {
    return (
        <div>
            <Label style={{display: 'inline-block'}}>{name}</Label>
            <FontIcon iconName="Cancel" style={{marginLeft: '25px'}} onClick={removeIngr}/>
        </div>
    )
}

const glassOptions = [
    { key: 'rocks', text: 'Rocks Glass'},
    { key: 'highball', text: 'Highball'},
    { key: 'martini', text: 'Martini'},
    { key: 'shot', text: 'Shot Glass'},
    { key: 'coupe', text: 'Coupe'},
    { key: 'mule', text: 'Mule Mug'}
];

const Admin = () => {
    const [name, setName] = useState("Old Fashioned");
    const [url, setUrl] = useState("https://cdn.liquor.com/wp-content/uploads/2018/05/08113350/bourbon-old-fashioned-720x720-recipe.jpg");
    const [instructions, setInstructions] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [allIngr, setAllIngr] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/ingredients')
            .then(result => {
                setAllIngr(result.data.map((ingr) => {
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

    const onIngrChange = (ev, op, index, value) => {
        if(value !== undefined){
            const newIng = {key: value, text: value};
            setAllIngr(allIngr.concat([newIng]));
        }else if(op != undefined){
            if(op.selected){
                setIngredients(ingredients.concat([op]));
            }else{
                setIngredients(ingredients.filter((i) => i.key !== op.key));
            }
        }
    }

    return (
        <div className="newDrink">
            <form id="newDrinkForm">
                <Stack {...columnProps}>
                    <TextField label="Drink Name" value={name} onChange={(e, v) => setName(v)}/>
                    <TextField label="Image URL" value={url} onChange={(e, v) => setUrl(v)} />
                    <Dropdown
                        label="Glassware"
                        defaultSelectedKey="rocks"
                        options={glassOptions}
                    />
                    <TextField label="Instructions" multiline rows={3} value={instructions} onChange={(e, v) => setInstructions(v)} />
                    <Label>Ingredients</Label>
                    <ComboBox
                        multiSelect
                        label="Add Ingredient"
                        allowFreeform={true}
                        autoComplete={'on'}
                        options={allIngr}
                        onChange={onIngrChange}
                        // options={allIngredients}
                        // onChange={(e, o, i, v) => console.log(o, i, v)}
                    />
                    {ingredients.sort((a, b) => a.name <= b.name ? -1 : 1)
                        .map(ing => 
                            <Ingredient key={ing.key} name={ing.text} removeIngr={() => setIngredients(ingredients.filter((i) => i.key !== ing.key))} />)}
                </Stack>
            </form>
        </div>
    )
}


export default Admin;