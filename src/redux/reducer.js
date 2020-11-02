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