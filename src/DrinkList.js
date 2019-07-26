import React, {useState, useEffect} from 'react';
import axios from 'axios';

// const Drink = ({name,}) => {
//   return (
//     <div className='drink'>
//       <h6>{props.name}</h6>
//       <img src='{props.imageUrl}' alt='{props.name} image' />
//     </div>
//     )
// }
const Drink = (props) => {
  return (
    <div>
      <h6>{props.name}</h6>
      <img src={props.imageUrl} alt='' width='200px' height='auto' />
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
      }).map(d => <Drink key={d.name} name={d.name} imageUrl={d.imageUrl}/>)}
    </div>
    )
}

export default DrinkList;