import React from 'react'
import { hot } from 'react-hot-loader'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import PokemonList from './components/PokemonList'
// import PokemonInfoModal from './components/PokemonInfoModal'

const App = () => {
  return <div>
    <Router>
      <Switch>
        <Route exact path="/*">
          <PokemonList/>
        </Route>
        {/* <Route path="/pokemon/:pokemonName">
          <PokemonInfoModal/>
        </Route> */}
      </Switch>
    </Router>
  </div>
}

export default hot(module)(App)
