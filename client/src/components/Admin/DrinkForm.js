import React from 'react';
import { useState} from 'react';

import axios from 'axios';

import {TextField, Typography, Button} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextFieldList from '../../util/TextFieldList';
import RecipeIngrForm from './RecipeIngrForm';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


import Drink from '../../util/Drink';

const glassware = ['Martini', 'Old-Fashioned', 'Highball', 'Coupe', 'Mule'];

const DrinkForm = () => {
    const [name, setName] = useState('Martini');
    const [ingr, setIngr] = useState([{text: 'Gin', qty: 3},{text: 'Dry Vermouth', qty: 0.5}]);
    const [steps, setSteps] = useState(['Add all ingredients to mixing glass', 'Stir well with ice', 'Strain in chilled martini glass', 'Garnish with lemon peel or olives'])
    const [glass, setGlass] = useState('Martini');

    const [open, setOpen] = useState(false);

    const submit = () => {
        if(validateInput()){
            const drink = new Drink(name, '', ingr, steps, glass);
            console.log(drink);
            axios.post('/drink', {drink})
                .then(data => {
                    console.log(data);
                })
                .catch(err => {
                    setOpen(true);
                })
        }
    }

    const validateInput = () => {
        return true;
    }


    return (
        <form>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-error-title"
                aria-describedby="alert-error-description"
            >
                <DialogTitle id="alert-error-title">Error in creating Drink Recipe</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-error-description">
                        There was an error in saving the drink recipe. Drink with that name may already exist.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary" autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            <FormControl>
                <TextField
                    label='Name'
                    value={name} onChange={(e) => setName(e.target.value)}
                    autoComplete='off'
                />
            </FormControl>
            <FormControl>
                <Typography variant='h5' component='h6'>Ingredients</Typography>
                <RecipeIngrForm inputs={ingr} setInputs={setIngr} />
            </FormControl>
            <FormControl>
                <Typography variant='h5' component='h6'>Steps</Typography>
                <TextFieldList inputs={steps} setInputs={setSteps} id="steps" />
            </FormControl>
            <FormControl>
                <InputLabel id="glass-select-label">Glassware</InputLabel>
                <Select
                    labelId="glass-select-label"
                    id="glass-select"
                    value={glass}
                    onChange={(e) => setGlass(e.target.value)}
                >
                    {glassware.map((text, i) => (
                        <MenuItem key={'glassware_' + i} value={text}>{text}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button onClick={submit}>
                Submit
            </Button>
        </form>
    )
}

export default DrinkForm;