import { createStore } from 'redux';
import reducer from './reducer'

const store = createStore(reducer);




// import reducer from './reducers/reducer.js'
// import setFavouritePokemonData from './actionCreators/actionCreator.js'

// const initialState = {
// 	favouritePokemon: [],
// 	counter: 0
// }

// // Reducer
// const reducer = (state = initialState, action) => {
// 	switch (action.type) {
// 		case 'GET_FAVOURITE_LIST' :
// 			return {
// 				...state,
// 				favouritePokemon: action.value
// 			}
// 		case 'ADD' :
// 			return {
// 				counter: state.counter + 1
// 			}
// 	}
// 	return state 
// }

// // Store
// const store = createStore(reducer);

// store.subscribe(() => {
// 	console.log('subscribe', store.getState())
// })

// // Actions
// const getFavouriteList = {
// 	type: 'GET_FAVOURITE_LIST'
// }

// const addCounter = {
// 	type: 'ADD'
// }


// store.dispatch({type: 'GET_FAVOURITE_LIST', value: [3, 5, 6, 8, 1, 33]})
