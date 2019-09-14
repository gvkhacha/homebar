import React from 'react';
import { Stack } from 'office-ui-fabric-react';
import Ingredient from './Ingredient';

const IngredientList = ({ ingrList, isAdmin, removeIngr, isAmount }) => {


    return (
        <Stack>
            {ingrList.map(ing =>
                <Ingredient key={ing.key} ing={ing} removeIngr={() => removeIngr(ing)} isAdmin={isAdmin} isAmount={isAmount} />)
            }
        </Stack>
    )
}

export default IngredientList;