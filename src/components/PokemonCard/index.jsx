import React, { Component } from 'react';
import { withRouter } from "react-router";

import Star from './../../shared/icons/star.svg'

import styles from './index.module.scss';

// import { getPokemonsData } from './../../api/api.js';

class PokemonCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
			isFavourite: false,
    }
  }

  componentDidMount() {
		this.isFavourite()
	}

	clickStar = () => {
		let favouriteArr = localStorage.getItem("favouritePokemon") !== null ? JSON.parse(localStorage.getItem("favouritePokemon")) : []
		if(favouriteArr.every(item => {return item.id !== this.props.data.id})) {
			favouriteArr.push(this.props.data),
			localStorage.setItem("favouritePokemon", JSON.stringify(favouriteArr))
			this.setState({isFavourite: true})
		} else {
			let index;
			favouriteArr.forEach( (item, arrIndex) => {
				item.id === this.props.data.id && (index = arrIndex)
			})
			favouriteArr.splice(index, 1)
			localStorage.setItem("favouritePokemon", JSON.stringify(favouriteArr))
			this.setState({isFavourite: false})
		}		
	}

	isFavourite = () => {
		let favouriteArr = JSON.parse(localStorage.getItem("favouritePokemon"))
		favouriteArr.some( item => { return item.id === this.props.data.id }) && this.setState({isFavourite: true})
	}

  render () {
    return (
      <div className={styles.card} onClick={() => {this.props.history.push(`/pokemon/${this.props.data.name}`)}}>
				<div className={styles.cardPhoto}>
					<img src={this.props.data.ThumbnailImage}/>
				</div>
				<div className={styles.cardInfo}>
					<div className={styles.cardInfo__wrapper}>
						<p className={styles.cardInfo__id}>{`#${this.props.data.number}`}</p>
						<p className={styles.cardInfo__name}>{this.props.data.name}</p>
					</div>
					<div className={styles.cardInfo__star + ' ' + (this.state.isFavourite && styles.active)} onClick={() => this.clickStar()}>
						<Star/>
					</div>
				</div>
      </div>
    )
  }
}


export default withRouter(PokemonCard);