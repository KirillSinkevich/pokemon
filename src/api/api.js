export const getPokemonsData = () => {
	return fetch(`https://pokeapi.co/api/v2/pokemon/`,
    {
    	method: 'GET',
    	headers: {
        'User-Agent': 'Console app',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    	}
		}).then( response => {
			if(response.ok) {
				return response.json()
			}
		})
}
