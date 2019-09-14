import React from 'react';
import DrinkAdmin from './DrinkAdmin';
import { Stack } from 'office-ui-fabric-react';
import IngredientAdmin from './IngredientAdmin';

const Admin = () => {

    return (
        <Stack horizontal styles={{
            tokens: { childrenGap: 15 },
            styles: { root: { width: 300 } }
        }}>
            <DrinkAdmin />
            <IngredientAdmin />
        </Stack>
    )
}


export default Admin;