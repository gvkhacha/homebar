import React from 'react';
import { Stack } from 'office-ui-fabric-react';
import Ingredient from './Ingredient';

const IngredientList = ({ ingrList, isAdmin, removeIngr }) => {

    return (
        <Stack>
            {ingrList.map(ing =>
                <Ingredient key={ing.key} name={ing.text} removeIngr={() => removeIngr(ing)} isAdmin={isAdmin} />)
            }
        </Stack>
    )
}

export default IngredientList;