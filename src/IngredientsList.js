import React, {useState, useEffect} from 'react';
import axios from 'axios';



const Ingredient = ({name, supply, id}) => {
	const [checked, setChecked] = useState(supply || false);

	const handleChange = () => {
		if(checked){
			axios.delete(`http://localhost:3001/supply/${encodeURIComponent(name)}`)
				.then(result => {
					if(result.status !== 500){
						setChecked(false);
					}
				})
		}else{
			axios.post(`http://localhost:3001/supply/${encodeURIComponent(name)}`)
				.then(result => {
					if(result.status !== 500){
						setChecked(true);
					}
				})
		}
	}

	return (
		<div className='ingredient'>
			<input type='checkbox' name={id} id={id} defaultChecked={checked} onChange={() => handleChange()} />
			<label htmlFor={id}>{name}</label>
		</div>
		)
}

const IngredientsList = (props) => {
	const [ingredients, setIngredients] = useState([]);
	useEffect(() => {
		axios.get('http://localhost:3001/ingredients')
			.then(result => {
				setIngredients(result.data)
			});
	}, [])

	return (
		ingredients.sort((a, b) => a.name <= b.name ? -1 : 1)
			.map(ing => <Ingredient key={ing._id} supply={ing.supply} name={ing.name} id={ing._id} />)

		)
}

export default IngredientsList