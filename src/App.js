import React from 'react'
import { hot } from 'react-hot-loader'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Provider } from 'react-redux'
import { createStore } from 'redux';

import reducer from './redux/reducer'

const store = createStore(reducer);

import PokemonList from './components/PokemonList'

const App = () => {
  return <div>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/*">
            <PokemonList/>
          </Route>
        </Switch>
      </Router>
    </Provider>
  </div>
}

export default hot(module)(App)
