export const ACTION_POKEMON_LIST_UPDATED = 'SET_POKEMON_LIST'

const initialState = {
  favouritePokemon: [],
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_POKEMON_LIST' :
      return {
        ...state,
        favouritePokemon: action.value
      }

  }
  return state; 
}

export const setPokemonList = data => {
  return {
    type: ACTION_POKEMON_LIST_UPDATED, 
    value: data
  }
}