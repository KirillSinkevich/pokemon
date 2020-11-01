import React, { Component } from 'react';
import Modal from 'react-modal';
import { withRouter } from "react-router";
import { getPokemonData } from './../../api/api.js';

import styles from './index.module.scss';

class PokemonInfoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: {}
    };
  }

  componentDidMount() {
    getPokemonData(this.props.match.params.pokemonName).then(data => this.setState({pokemon: data}))
  }

  generateNumber = () => {
    let number = '000';
    let id = this.state.pokemon.id.toString();
    return id.length < 3 ? number.substr(0, number.length - id.length) + id : id;
  }

  dataAvailable = () => {
    return Object.keys(this.state.pokemon).length > 0;
  }

  toUpperCaseName = (name) => {
    return name[0].toUpperCase() + name.slice(1);
  }

  displayList = (list, field) => {
    return this.state.pokemon[list]
    .map(item => item[field])
    .map(item => this.toUpperCaseName(item.name))
    .join(', ');
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
            this.dataAvailable() && 
            <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${this.generateNumber()}.png`} />
          }
        </div>
        <div className={styles.info}>
          <div className={styles.info__name}>
            {
              this.dataAvailable() && this.toUpperCaseName(this.state.pokemon.name)
            }
          </div>
          <div className={styles.info__poke}>
            <div className={styles.info__poke__spec}>
              <div className={styles.info__poke__spec__name}>Height</div>
              <div className={styles.info__poke__spec__value}>
                {`${this.dataAvailable() ? this.state.pokemon.height : ''} "`}
              </div>
            </div>
            <div className={styles.info__poke__spec}>
              <div className={styles.info__poke__spec__name}>Weight</div>
              <div className={styles.info__poke__spec__value}>
                {`${this.dataAvailable() ? this.state.pokemon.weight : ''} lbs`}
              </div>
            </div>
            <div className={styles.info__poke__spec}>
              <div className={styles.info__poke__spec__name}>Abilities</div>
              <div className={styles.info__poke__spec__value}>
                {
                  this.dataAvailable() && this.displayList('abilities', 'ability')
                }
              </div>
            </div>
            <div className={styles.info__poke__spec}>
              <div className={styles.info__poke__spec__name}>Type</div>
              <div className={styles.info__poke__spec__value}>
                {
                  this.dataAvailable() && this.displayList('types', 'type')
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