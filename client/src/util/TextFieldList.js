import React from 'react';

import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';


const TextFieldList = ({inputs, setInputs, id}) => {
    //State handled in parent

    const handleChange = (event, index) => {
        setInputs(inputs.map((val, i) => {
            return i !== index ? val : event.target.value;
        }));
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
                Add new Item
            </Button>
            <List>
                {inputs.map((text, i) => (
                    <ListItem key={id + i}>
                        <TextField
                            value={text} onChange={(e) => handleChange(e, i)}
                            // onKeyPress={(e) => handleKeyPress(e, i)}
                            fullWidth autoComplete='off' 
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

export default TextFieldList;