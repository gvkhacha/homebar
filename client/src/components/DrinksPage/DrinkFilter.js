import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const TYPES = ["all", "gin", "vodka", "cognac", "whiskey", "tequila"];

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

const DrinkFilter = ({alc, setFilter}) => {
    const classes = useStyles();

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="alcoholFilter">Alcohol</InputLabel>
                <Select
                    labelId="alcoholFilter"
                    id="alcoholFilter-select"
                    value={alc}
                    onChange={e => setFilter(e.target.value)}
                >
                    {TYPES.map(alcType => 
                        <MenuItem value={alcType} key={alcType}>{alcType[0].toUpperCase() + alcType.substr(1)}</MenuItem>
                    )}
                </Select>
            </FormControl>
        </div>
    )
}

export default DrinkFilter;