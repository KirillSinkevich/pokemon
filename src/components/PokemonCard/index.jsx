import React, { Component } from 'react';
import { withRouter } from "react-router";
import { connect } from 'react-redux'

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

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.favouritePokemon !== this.props.favouritePokemon) {
			this.isFavourite()
		}
	}

	clickCard = () => {
		this.props.history.push(`/pokemon/${this.props.data.name}`)
	}

	clickStar = (e) => {
		e.stopPropagation()
		let favouriteArr = localStorage.getItem("favouritePokemon") !== null ? JSON.parse(localStorage.getItem("favouritePokemon")) : []
		if(favouriteArr.every(item => {return item.id !== this.props.data.id})) {
			favouriteArr.push(this.props.data),
			localStorage.setItem("favouritePokemon", JSON.stringify(favouriteArr))
			this.props.setPokemonList(favouriteArr)
			this.setState({isFavourite: true})
		} else {
			let index;
			favouriteArr.forEach( (item, arrIndex) => {
				item.id === this.props.data.id && (index = arrIndex)
			})
			favouriteArr.splice(index, 1)
			this.props.setPokemonList(favouriteArr)
			localStorage.setItem("favouritePokemon", JSON.stringify(favouriteArr))
			this.setState({isFavourite: false})
		}		
	}

	isFavourite = () => {
		this.props.favouritePokemon.some( item => { 
			return item.id === this.props.data.id }) ? this.setState({isFavourite: true}) : this.setState({isFavourite: false})
	}

  render () {
    return (
      <div className={styles.card} onClick={() => this.clickCard()}>
				<div className={styles.cardPhoto}>
					<img src={this.props.data.ThumbnailImage}/>
				</div>
				<div className={styles.cardInfo}>
					<div className={styles.cardInfo__wrapper}>
						<p className={styles.cardInfo__id}>{`#${this.props.data.number}`}</p>
						<p className={styles.cardInfo__name}>{this.props.data.name}</p>
					</div>
					{	!this.props.isFavourite &&
						<div 
							className={styles.cardInfo__star + ' ' + (this.state.isFavourite && styles.active)} 
							onClick={(e) => this.clickStar(e)}
						>
							<Star/>
						</div>
					}
				</div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    favouritePokemon: state.favouritePokemon
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPokemonList: (data) => dispatch({ type: 'SET_POKEMON_LIST', value: data})
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PokemonCard));