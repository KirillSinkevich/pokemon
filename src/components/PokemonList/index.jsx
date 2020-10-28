import React, { Component } from 'react';

import styles from './index.module.scss';

import { getPokemonsData } from './../../api/api.js';

import PokemonCard from './../PokemonCard'

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
      this.setState({dataList: res})
    })
  }

  onScroll = () => {
    const scrollHeight = this.list.current.scrollHeight
    const clientHeight = this.list.current.clientHeight
    const scrollTop = this.list.current.scrollTop
    const scrollBottom = clientHeight + scrollTop
    // console.log(this.list)
    // console.log(`scroll height ${scrollHeight} scrollTop: ${scrollTop}  scrollBottom: ${clientHeight + scrollTop}`)
    if(scrollBottom === scrollHeight) {
      this.setState({counter: this.state.counter + 20})
    }
  }

  render () {
    return (
      <div className={styles.container} onScroll={e => this.onScroll()} ref={this.list}>
        {
          this.state.dataList && this.state.dataList.slice(0, this.state.counter).map( (pokemonInfo, index) => {
            return <PokemonCard key={index} data={pokemonInfo}/>
          })
        }
      </div>
    )
  }
}


export default PokemonList;