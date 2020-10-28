import React, { Component } from 'react';

import styles from './index.module.scss';

// import { getPokemonsData } from './../../api/api.js';

class PokemonCard extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {

  }

  render () {
    return (
      <div className={styles.card}></div>
    )
  }
}


export default PokemonCard;