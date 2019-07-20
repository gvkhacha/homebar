import React from 'react';
import IngredientsList from './IngredientsList';
import DrinkList from './DrinkList';
import { Switch, Route } from 'react-router-dom'


const App = () => {
  return (
    <Switch>
      <Route exact path='/' component={DrinkList}/>
      <Route path='/admin' component={IngredientsList}/>
    </Switch>
    )
}

export default App;