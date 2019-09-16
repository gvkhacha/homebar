import React from 'react';
import { Stack, Label } from 'office-ui-fabric-react';
import Ingredient from './Ingredient';

const IngredientList = ({ ingrList, isAdmin, removeIngr, isAmount }) => {

    if(isAmount){
        return (
            <Stack>
                {ingrList.map(ing =>
                    <Stack horizontal key={"stack" + ing.ingredient.key}>
                        <Label key={"amt" + ing.ingredient.key} styles={{ root: { width: '100px' } }}>{ing.amount}</Label>
                        <Ingredient key={ing.ingredient.key} ing={ing.ingredient} removeIngr={() => removeIngr(ing)} isAdmin={isAdmin} />)
                    </Stack>
                )}
            </Stack>
        )
    }else{
        return (
            <Stack>
                {ingrList.map(ing =>
                    <Ingredient key={ing.key} ing={ing} removeIngr={() => removeIngr(ing)} isAdmin={isAdmin} isAmount={isAmount} />)
                }
            </Stack>
        )
    }

}

export default IngredientList;