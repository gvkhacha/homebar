import React, {useState, useEffect} from 'react';
import { ChoiceGroup } from 'office-ui-fabric-react';
import axios from 'axios';
import Drink from './models/Drink';


const DrinkList = () => {
  const [drinks, setDrinks] = useState([]);
  const [liqFilter, setLiqFilter] = useState('all');

  const getAllDrinks = () => {
    axios.get("http://localhost:3001/all")
      .then(result => {
        setDrinks(result.data);
      })
  }

  useEffect(getAllDrinks, [])

  const filterOptions = [
    {
      key: 'all',
      text: 'Any Liquor'
    },
    {
      key: 'vodka',
      text: 'Vodka'
    },
    {
      key: 'tequila',
      text: 'Tequila'
    },
    {
      key: 'gin',
      text: 'Gin'
    },
    {
      key: 'rum',
      text: 'Rum'
    },
    {
      key: 'whiskey',
      text: 'Whiskey'
    },
    {
      key: 'cognac',
      text: 'Cognac'
    },
  ]

  return (
    <div>
      <ChoiceGroup
        defaultSelectedKey={liqFilter}
        options={filterOptions}
        onChange={(ev, op) => { setLiqFilter(op.key) }}
        styles={{ flexContainer: { display: "flex",},
                  root: {marginRight: 10} }}
      />


      {drinks.filter((drink) => {
        if(liqFilter === 'all'){
          return true;
        }
        return drink.ingredients.find(ing => ing.ingredient.name.toLowerCase().includes(liqFilter))
      }).map(d => <Drink key={d.name} drink={d} />)}
    </div>
    )
}

export default DrinkList;