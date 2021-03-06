import React from 'react';

import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


const RecipeIngrForm = ({ inputs, setInputs, ingredients }) => {
    //State handled in parent

    const handleChange = (event, index, change) => {
        setInputs(inputs.map((val, i) => {
            if(i === index){
                return {
                    text: change === 'text' ? event.target.value : val.text,
                    qty: change === 'qty' ? event.target.value : val.qty
                }
            }
            return val;
        }))
    }

    const removeItem = (index) => {
        setInputs(inputs.filter((val, i) => i !== index));
    }

    const addItem = () => {
        setInputs(inputs.concat(['']));
    }

    return (
        <>
            <Button onClick={addItem}>
                Add Ingredient
            </Button>
            <List>
                {inputs.map((obj, i) => (
                    <ListItem key={"ingr_" + obj.text + "_" + i}>
                        <Select
                            labelId="categoryFilter"
                            id="categoryFilter-select"
                            value={obj.text}
                            onChange={e => handleChange(e, i, 'text')}
                        >
                            {ingredients.map(i =>
                                <MenuItem value={i.name} key={i.name}>{i.name[0].toUpperCase() + i.name.substr(1)}</MenuItem>                               
                            )}
                        </Select>
                        <TextField
                            type='number' label='Quantity(oz)'
                            inputProps={{ step: "0.25", min: '0', max: '6' }}
                            value={obj.qty} onChange={(e) => handleChange(e, i, 'qty')}
                        />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="remove" onClick={() => removeItem(i)}>
                                <Delete />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </>
    )
}

export default RecipeIngrForm;