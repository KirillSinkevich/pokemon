import React, { Component } from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from 'react-redux'
import styles from './index.module.scss';

import { getPokemonsList } from './../../api/api.js';

import PokemonCard from './../PokemonCard'
import PokemonInfoModal from './../PokemonInfoModal'

class PokemonList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pokemonList: [],
      choosePokemonData: {},
      counter: 20,
    }
    this.list = React.createRef()
  }

  componentDidMount() {
    getPokemonsList().then( res => {
      this.setState({pokemonList: this.delDuplicates(res)})
    })
    this.props.setPokemonList(JSON.parse(localStorage.getItem("favouritePokemon")))
  }

  // iterate over the array to remove duplicate pokemon
  delDuplicates = (arr) => {
    let copyArr = [];
    arr.forEach( (item, i) => {
      if(copyArr.length === 0) {
        copyArr.push(item)
      } else {
        copyArr.every(copyItem => { return copyItem.id !== item.id }) && copyArr.push(item)
      }
    })
    return copyArr
  }
  // checking for pagination
  onScroll = () => {
    const scrollHeight = this.list.current.scrollHeight
    const clientHeight = this.list.current.clientHeight
    const scrollTop = this.list.current.scrollTop
    const scrollBottom = clientHeight + scrollTop
    if(scrollBottom === scrollHeight) { this.setState({counter: this.state.counter + 20})}
  }

  render () {
    return (
      <div className={styles.container}>
        <div className={styles.container__mainList}>
          <div className={styles.container__mainList__headers}>Pokemon list</div>
          <div className={styles.container__mainList__list} onScroll={e => this.onScroll()} ref={this.list}>
            {
              this.state.pokemonList && this.state.pokemonList.slice(0, this.state.counter).map( (pokemonInfo, index) => {
                return <PokemonCard key={index} data={pokemonInfo}/>
              })
            }
          </div>
        </div>
        <div className={styles.container__favouritesList  + ' ' + (this.props.favouritePokemon.length === 0 && styles.fullWidth)}>
          <div className={styles.container__favouritesList__headers}>Favourite pokemon list</div>
          <div className={styles.container__favouritesList__list}>
            {
              this.props.favouritePokemon && this.props.favouritePokemon.sort( (a, b) => {return a.id > b.id ? 1 : -1}).map( (pokemonInfo, index) => {
                return <PokemonCard key={index} data={pokemonInfo}/>
              })
            }
          </div>
        </div>
        <Switch>
          <Route path="/pokemon/:pokemonName">
            <PokemonInfoModal/>
          </Route>
        </Switch>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PokemonList));