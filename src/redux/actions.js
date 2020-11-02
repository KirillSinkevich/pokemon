import * as actions from './constants.js';

export const setPokemonList = data => {
  return {
    type: actions.ACTION_POKEMON_LIST_UPDATED, 
    value: data
  }
}