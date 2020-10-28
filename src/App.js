import React from 'react'
import { hot } from 'react-hot-loader'

import PokemonList from './components/PokemonList'
const App = () => {
  return <div><PokemonList/></div>
}

export default hot(module)(App)
