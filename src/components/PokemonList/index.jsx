import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import styles from './index.module.scss';

import { getPokemonsData } from './../../api/api.js';

import PokemonCard from './../PokemonCard'
import PokemonInfoModal from './../PokemonInfoModal'

class PokemonList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataList: [],
      counter: 20,
    }
    this.list = React.createRef()
  }

  componentDidMount() {
    getPokemonsData().then( res => {
      this.setState({dataList: this.delDuplicates(res)})
    })
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

  byField = (field) => {
    debugger
    return (a, b) => a[field] > b[field] ? 1 : -1;
  }

  render () {
    return (
      <div className={styles.container} id="list">
        <div className={styles.mainList} onScroll={e => this.onScroll()} ref={this.list}>
          {
            this.state.dataList && this.state.dataList.slice(0, this.state.counter).map( (pokemonInfo, index) => {
              return <PokemonCard key={index} data={pokemonInfo}/>
            })
          }
        </div>
        <div className={styles.favouritesList}>
          {
            JSON.parse(localStorage.getItem("favouritePokemon")).sort( (a, b) => {return a.id > b.id ? 1 : -1}).map( (pokemonInfo, index) => {
              return <PokemonCard key={index} data={pokemonInfo}/>
            })
          }
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


export default PokemonList;