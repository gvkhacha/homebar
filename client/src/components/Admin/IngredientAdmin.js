import React from 'react';
import axios from 'axios';
import {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';

import Layout from '../Layout';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
  },
  paper: {
    width: 200,
    height: 230,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

function groupBy(arr, property) {
    return arr.reduce(function(memo, x) {
        if (!memo[x[property]]) { memo[x[property]] = []; }
        memo[x[property]].push(x);
        return memo;
    }, {});
}

const CATS = ["all", "alcohol", "liqueur", "juice", "wine", "other"];

const IngredientAdmin = () => {
  const classes = useStyles();
  const history = useHistory();
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  const [category, setCategory] = useState("all");

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  useEffect(() => {
    axios.get('/api/ingredients').then(result => result.data).then(data => {
        const grouped = groupBy(data, "available");
        setLeft(grouped.false || []);
        setRight(grouped.true || []);
    })
  }, []);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const submit = () => {
      const data = {"true": right.map(i => i._id), "false": left.map(i => i._id)};
      axios.patch("/api/ingredients", data)
      history.push('/admin');
  }

  const customList = (items) => (
    <Paper className={classes.paper}>
      <List dense component="div" role="list">
        {items.sort((a, b) => a.name > b.name ? 1 : -1)
          .map((value) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <ListItem key={value._id} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value.name}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <Layout>
        <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
            <Grid item>
                <Select
                    labelId="categoryFilter"
                    id="categoryFilter-select"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                >
                    {CATS.map(text => 
                        <MenuItem value={text} key={text}>{text[0].toUpperCase() + text.substr(1)}</MenuItem>
                    )}
                </Select>
            </Grid>
            <Grid item>
                <Grid container direction="column" alignItems="center">
                    <Grid item><Typography>Unavailable Ingredients</Typography></Grid>
                    <Grid item>{customList(left.filter(obj => category === 'all' || obj.category.toLowerCase() === category))}</Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container direction="column" alignItems="center">
                <Button
                    variant="outlined"
                    size="small"
                    className={classes.button}
                    onClick={handleAllRight}
                    disabled={left.length === 0}
                    aria-label="move all right"
                >
                    ≫
                </Button>
                <Button
                    variant="outlined"
                    size="small"
                    className={classes.button}
                    onClick={handleCheckedRight}
                    disabled={leftChecked.length === 0}
                    aria-label="move selected right"
                >
                    &gt;
                </Button>
                <Button
                    variant="outlined"
                    size="small"
                    className={classes.button}
                    onClick={handleCheckedLeft}
                    disabled={rightChecked.length === 0}
                    aria-label="move selected left"
                >
                    &lt;
                </Button>
                <Button
                    variant="outlined"
                    size="small"
                    className={classes.button}
                    onClick={handleAllLeft}
                    disabled={right.length === 0}
                    aria-label="move all left"
                >
                    ≪
                </Button>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container direction="column" alignItems="center">
                    <Grid item><Typography>Available Ingredients</Typography></Grid>
                    <Grid item>{customList(right.filter(obj => category === 'all' || obj.category.toLowerCase() === category))}</Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Button
                    variant="outlined"
                    className={classes.button}
                    onClick={submit}
                    aria-label="move all left"
                >Submit</Button>
            </Grid>
        </Grid>
    </Layout>
  );
}

export default IngredientAdmin;