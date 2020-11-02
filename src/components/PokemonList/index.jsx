import React, { Component } from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { setPokemonList } from './../../redux/actions'

import styles from './index.module.scss';

import { getPokemonsList } from './../../api/api.js';

import PokemonCard from './../PokemonCard'
import PokemonInfoModal from './../PokemonInfoModal'

class PokemonList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemonList: [],
      counter: 20,
    };
    this.list = React.createRef();
  }

  componentDidMount() {
    getPokemonsList().then( data => {
      this.setState({pokemonList: this.removeDuplicates(data)});
    })
    this.loadFromLocalStorage();
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.favouritePokemon !== this.props.favouritePokemon) {
      this.updateLocalStorage(this.props.favouritePokemon);
    }
  }

  loadFromLocalStorage = () => {
    localStorage.getItem("favouritePokemon") !== null && this.props.setPokemonList(JSON.parse(localStorage.getItem("favouritePokemon")));
  }

  updateLocalStorage = data => {
    localStorage.setItem("favouritePokemon", JSON.stringify(data));
  }

  // iterate over the array to remove duplicate pokemon
  removeDuplicates = (items) => {
    let collected = [];
    
    return items.filter(item => {
      collected.push(item.id);
      return collected.indexOf(item.id) === collected.length - 1;
    })
  }
  // checking for pagination
  onScroll = () => {
    const scrollHeight = this.list.current.scrollHeight;
    const clientHeight = this.list.current.clientHeight;
    const scrollTop = this.list.current.scrollTop;
    const scrollBottom = clientHeight + scrollTop;
    if (scrollBottom === scrollHeight) { 
      this.setState((state) => {
        return {counter: state.counter + 20};
      });
    }
  }

  sortingList = (data) => {
    let list = JSON.parse(JSON.stringify(data));
    return list.sort( (a, b) => {return a.id > b.id ? 1 : -1});
  }

  render () {
    return (
      <div className={styles.container}>
        <div className={styles.container__mainList}>
          <div className={styles.container__mainList__headers}>Pokemon list</div>
          <div className={styles.container__mainList__list} onScroll={this.onScroll} ref={this.list}>
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
              this.props.favouritePokemon && this.sortingList(this.props.favouritePokemon).map( (pokemonInfo, index) => {
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

const mapDispatchToProps = dispatch => bindActionCreators({
  setPokemonList
}, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PokemonList));