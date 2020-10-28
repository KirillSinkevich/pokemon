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
      <div className={styles.card}>
				<div className={styles.cardPhoto}>
					<img src={this.props.data.ThumbnailImage}/>
				</div>
				<div className={styles.cardInfo}>
					<p className={styles.cardInfo__id}>{`#${this.props.data.number}`}</p>
					<p className={styles.cardInfo__name}>{this.props.data.name}</p>
				</div>
      </div>
    )
  }
}


export default PokemonCard;