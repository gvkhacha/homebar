import React from 'react';
import { Label, FontIcon, TextField } from 'office-ui-fabric-react';


const Ingredient = ({ ing, removeIngr, isAdmin, isAmount }) => {

    if(isAmount){
        if(isAdmin){
            return (
                <div>
                    <Label style={{ display: 'inline-block' }}>{ing.name}</Label>
                    <TextField />
                    <FontIcon iconName="Cancel" style={{ marginLeft: '25px' }} onClick={removeIngr} />
                </div>
            )
        }else{

        }
    }


    if (isAdmin) {
        return (
            <div>
                <Label style={{ display: 'inline-block' }}>{ing.name}</Label>
                <FontIcon iconName="Cancel" style={{ marginLeft: '25px' }} onClick={removeIngr} />
            </div>
        )
    } else {
        return (
            <div>
                <Label style={{ display: 'inline-block' }}>{ing.name}</Label>
            </div>
        )
    }
}

export default Ingredient;