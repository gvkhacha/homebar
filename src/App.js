import React from 'react';
import IngredientsList from './IngredientsList';
import Admin from './Admin';
import DrinkList from './DrinkList';
import { Switch, Route } from 'react-router-dom'
import { initializeIcons } from '@uifabric/icons';
initializeIcons();

const App = () => {
  return (
    <Switch>
      <Route exact path='/' component={DrinkList}/>
      <Route path='/admin' component={Admin}/>
    </Switch>
    )
}

export default App;