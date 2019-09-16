import React, { useState } from 'react';
import crypto from 'crypto';
import { Label, Toggle } from 'office-ui-fabric-react';
import IngredientList from './IngredientsList';

const Drink = ({ drink }) => {
    console.log(drink);
    const [details, setDetails] = useState(false);

    const handleToggle = (ev, checked) => {
        setDetails(checked);
    }

    const createKey = (input) => {
        return crypto.createHash('sha1').update(input).digest('base64');
    }

    return (

        <div>
            <Label>{drink.name}</Label>
            <img src={drink.imageUrl} alt={drink.name} width='200px' height='auto' />
            <Toggle label="Show Drink Details" onChange={handleToggle} defaultChecked={details} />
            <div style={{ display: details ? 'block' : 'none' }} >
                <Label>Glass: {drink.glass}</Label>
                <Label>Ingredients: </Label>
                <IngredientList ingrList={drink.ingredients} isAdmin={false} isAmount={true} />
                <Label>Instructions: </Label>
                <ol>
                    {drink.instructions.map(ins => <li key={createKey(ins)}>{ins}</li>)}
                </ol>
            </div>
        </div>
    )
}

export default Drink;