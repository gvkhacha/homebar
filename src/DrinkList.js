import React, {useState, useEffect} from 'react';
import axios from 'axios';
import crypto from 'crypto';

const Ingredient = ({name, measure}) => {
  return (
    <li>{name}: {measure}</li>
    )
}

const Drink = ({drink}) => {
  const [details, setDetails] = useState(false);

  const handleToggle = () => {
    setDetails(!details);
  }

  const createKey = (input) => {
    return crypto.createHash('sha1').update(input).digest('base64');
  }

  return (
    <div>
      <h6>{drink.name}</h6>
      <img src={drink.imageUrl} alt='' width='200px' height='auto' />
      <label>
        <input type='checkbox' onChange={() => handleToggle()} />
        Show Details
      </label>
      <div style={{display: details ? 'block' : 'none'}} >
        <p>Glass: {drink.glass}</p>
        <h6>Ingredients</h6>
        <ul>
          {drink.ingredients.map(ing => <Ingredient key={ing._id} name={ing.name} measure={ing.measure} />)}
        </ul>
        <h6>Instructions</h6>
        <ol>
          {drink.instructions.map(ins => <li key={createKey(ins)}>{ins}</li>)}
        </ol>
      </div>
    </div>
    )
}

const DrinkList = () => {
  const [drinks, setDrinks] = useState([]);
  const [availFilter, setAvailFilter] = useState('available');
  const [liqFilter, setLiqFilter] = useState('all');

  const getAllDrinks = () => {
    axios.get("http://localhost:3001/all")
      .then(result => {
        setDrinks(result.data);
      })
      setAvailFilter('all');
  }

  const getAvailableDrinks = () => {
    axios.get("http://localhost:3001/available")
      .then(result => {
        setDrinks(result.data);
      })
      setAvailFilter('available');
  }

  const filterHandler = (e) => {
    setLiqFilter(e.target.value);
  }


  useEffect(getAvailableDrinks, [])

  return (
    <div>
      <form>
        <label><input type="radio" value="all" 
            checked={availFilter === 'all'} onChange={() => getAllDrinks()} /> All Drinks</label>
        <label><input type="radio" value="available" 
            checked={availFilter === 'available'} onChange={() => getAvailableDrinks()}/> Available Drinks</label>
      </form>
      <form>
        <label><input type="radio" value="all" checked={liqFilter === 'all'} onChange={(e) => filterHandler(e)} /> All Liquor</label>
        <label><input type="radio" value="vodka" checked={liqFilter === 'vodka'} onChange={(e) => filterHandler(e)}/> Vodka </label>
        <label><input type="radio" value="tequila" checked={liqFilter === 'tequila'} onChange={(e) => filterHandler(e)}/> Tequila </label>
        <label><input type="radio" value="cognac" checked={liqFilter === 'cognac'} onChange={(e) => filterHandler(e)}/> Cognac </label>
        <label><input type="radio" value="whiskey" checked={liqFilter === 'whiskey'} onChange={(e) => filterHandler(e)}/> Whiskey </label>
        <label><input type="radio" value="gin" checked={liqFilter === 'gin'} onChange={(e) => filterHandler(e)}/> Gin </label>
        <label><input type="radio" value="rum" checked={liqFilter === 'rum'} onChange={(e) => filterHandler(e)}/> Rum </label>
      </form>
      {drinks.filter((drink) => {
        if(liqFilter === 'all'){
          return true;
        }
        return drink.ingredients.find(ing => ing.name.toLowerCase().includes(liqFilter))
      }).map(d => <Drink key={d.name} drink={d} name={d.name} imageUrl={d.imageUrl} ingredients={d.ingredients} />)}
    </div>
    )
}

export default DrinkList;