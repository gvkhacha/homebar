import React from 'react';
import { Label, FontIcon } from 'office-ui-fabric-react';


const Ingredient = ({ name, removeIngr, isAdmin }) => {
    if (isAdmin) {
        return (
            <div>
                <Label style={{ display: 'inline-block' }}>{name}</Label>
                <FontIcon iconName="Cancel" style={{ marginLeft: '25px' }} onClick={removeIngr} />
            </div>
        )
    } else {
        return (
            <div>
                <Label style={{ display: 'inline-block' }}>{name}</Label>
            </div>
        )
    }
}

export default Ingredient;