const initialState = {
  favouritePokemon: [],
  loading: false
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_POKEMON_LIST' :
      return {
        ...state,
        favouritePokemon: action.value
      }

    case 'TOGGLE_DATA_LOADING' :
      return {
        ...state,
        loading: !state.loading
      }

  }
  return state; 
}