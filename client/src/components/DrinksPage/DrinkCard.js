import React from 'react';
import clsx from 'clsx';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addOrder, removeOrder } from '../../actions/drinkActions';


import { makeStyles } from '@material-ui/core/styles';

import {
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Collapse,
    Avatar,
    IconButton,
    Typography,
    List,
    ListItem,
    ListItemText
} from '@material-ui/core';

import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Block from '@material-ui/icons/Block';
import ExposurePlus1 from '@material-ui/icons/ExposurePlus1';


const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
    margin: 5
  },
  media: {
    paddingTop: '56.25%', // 16:9
    width: "100%",
    height: "300px"
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));


const DrinkCard = ({drink, admin}) => {
    const user = useSelector(state => state.user);
    const classes = useStyles();
    const dispatch = useDispatch();

    const [expanded, setExpanded] = useState(false);
    const [ordered, setOrdered] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    }

    const orderDrink = () => {
        setOrdered(true);
        dispatch(addOrder(drink.id))
    }

    const cancelOrder = () => {
        dispatch(removeOrder(drink.id))
    }
    return (
        <Card className={classes.card}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {drink.alc.charAt(0)}
                    </Avatar>
                    }
                title={drink.name}
            />
            <CardMedia
                className={classes.media}
                image={drink.img}
                title={drink.name}
            />
            <CardContent>
                <List>
                    <ListItem>
                        <ListItemText>Alcohol: {drink.alc}</ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>Glassware: {drink.glassware}</ListItemText>
                    </ListItem>
                </List>
            </CardContent>
            <CardActions disableSpacing>
                {admin ? 
                    <div>
                        {user.loggedIn ? 
                            <IconButton onClick={cancelOrder}>
                                <Block />
                            </IconButton> : <></>
                        }
                        <IconButton onClick={orderDrink}>
                            <ExposurePlus1 />
                        </IconButton>
                    </div>
                    :<IconButton 
                        onClick={orderDrink}
                        aria-label="add to favorites">
                        {ordered ? <FavoriteIcon /> : <FavoriteBorder />}
                    </IconButton>
                }
                
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Ingredients:</Typography>
                    <ul>
                        {drink.ingredients.map((ingr, i) => (
                            <li key={drink.name + "_ingr_" + i + "_bullet"}><Typography key={drink.name + "_ingr_" + i} paragraph>{ingr.quantity}oz {ingr.name}</Typography></li>
                        ))}
                    </ul>
                <Typography paragraph>Method:</Typography>
                <ol>
                    {drink.steps.map((s, i) => (
                        <li key={drink.name + "_step_" + i + "_bullet"}><Typography key={drink.name + "_step_" + i} paragraph>{s}</Typography></li>
                    ))}
                </ol>
                </CardContent>
            </Collapse>
        </Card>
    )
}

export default DrinkCard;
