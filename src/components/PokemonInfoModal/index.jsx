import React, { Component } from 'react';
import Modal from 'react-modal';
import { withRouter } from "react-router";
import { getPokemonData } from './../../api/api.js';

import styles from './index.module.scss';

class PokemonInfoModal extends Component {
	constructor(props) {
		super(props)
		this.state = {
			pokemonData: {}
		}
	}

	componentDidMount() {
		getPokemonData(this.props.match.params.pokemonName).then( res => {
			this.setState({pokemonData: res})
		})
	}

	render () {
		return (
			<Modal
				isOpen={true}
				className={styles.modal}
				overlayClassName={styles.overlay}
				onRequestClose={() => this.props.history.push("/")}
				appElement={document.getElementById("app")}
			>
				<div className={styles.photo}>
					{
						Object.keys(this.state.pokemonData).length > 0 && 
						<img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.state.pokemonData.id}.png`} />
					}
				</div>
				<div className={styles.infoContainer}>
					<div className={styles.infoContainer__pokemonName}>
						{
							Object.keys(this.state.pokemonData).length > 0 &&
							this.state.pokemonData.name[0].toUpperCase() + this.state.pokemonData.name.slice(1)
						}
					</div>
					<div className={styles.infoContainer__wrapper}>
						<div className={styles.infoContainer__characteristics}>
							<div className={styles.infoContainer__characteristics__name}>Height</div>
							<div className={styles.infoContainer__characteristics__value}>
								{`${this.state.pokemonData.height} "`}
							</div>
						</div>
						<div className={styles.infoContainer__characteristics}>
							<div className={styles.infoContainer__characteristics__name}>Weight</div>
							<div className={styles.infoContainer__characteristics__value}>
								{`${this.state.pokemonData.weight} lbs`}
							</div>
						</div>
						<div className={styles.infoContainer__characteristics}>
							<div className={styles.infoContainer__characteristics__name}>Abilities</div>
							<div className={styles.infoContainer__characteristics__value}>
								{
									Object.keys(this.state.pokemonData).length > 0 && 
									this.state.pokemonData.abilities
									.map(item => item.ability)
									.map(item => item.name[0].toUpperCase() + item.name.slice(1))
									.join(', ')
								}
							</div>
						</div>
						<div className={styles.infoContainer__characteristics}>
							<div className={styles.infoContainer__characteristics__name}>Type</div>
							<div className={styles.infoContainer__characteristics__value}>
								{
									Object.keys(this.state.pokemonData).length > 0 && 
									this.state.pokemonData.types
									.map(item => item.type)
									.map(item => item.name[0].toUpperCase() + item.name.slice(1))
									.join(', ')
								}
							</div>
						</div>
					</div>
				</div>
			</Modal>
		)
	}
}

export default withRouter(PokemonInfoModal);