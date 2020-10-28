import React, { Component } from 'react';

import styles from './index.module.scss';

import { getPokemonsData } from './../../api/api.js';

import PokemonCard from './../PokemonCard'

class PokemonList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataList: [],
    }
  }

  componentDidMount() {
    getPokemonsData().then( res => {
      // this.setState({dataList: res.results})
    })
  }

  render () {
    return (
      <div className={styles.container}>
        {
          this.state.dataList && this.state.dataList.map( (pokemonInfo, index) => {
            return <PokemonCard key={index} data={pokemonInfo}/>
          })
        }
      </div>
    )
  }
}


export default PokemonList;