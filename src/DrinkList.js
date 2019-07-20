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
  useEffect(() => {
    axios.get('http://localhost:3001/available')
      .then(result => {
        console.log(result);
        setDrinks(result.data)
      })
  }, [])

  return (
    <div>
      <h1>You can make</h1>
      {drinks.map(d => <Drink key={d.name} name={d.name} imageUrl={d.imageUrl}/>)}
    </div>
    )
}

export default DrinkList;