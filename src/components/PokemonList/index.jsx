import React, { Component } from 'react';

import styles from './index.module.scss';

import { getPokemonsData } from './../../api/api.js';

class PokemonList extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {
    getPokemonsData().then( res => {
      console.log(res)
    })
  }

  render () {
    return (
      <div className={styles.container}>PokemonList</div>
    )
  }
}


export default PokemonList;