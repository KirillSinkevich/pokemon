import React, { Component } from 'react';
import { withRouter } from "react-router";
import { connect } from 'react-redux'

import { setPokemonList } from './../../redux/reducer'

import Star from './../../shared/icons/star.svg'

import styles from './index.module.scss';
import { bindActionCreators } from 'redux';

class PokemonCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavourite: false,
    };
  }

  componentDidMount() {
    this.isFavourite();
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.favouritePokemon !== this.props.favouritePokemon) {
      this.isFavourite();
    }
  }

  clickCard = () => {
    this.props.history.push(`/pokemon/${this.props.data.slug}`);
  }

  clickStar = (e) => {
    e.stopPropagation();
    let favouriteArr = localStorage.getItem("favouritePokemon") !== null ? JSON.parse(localStorage.getItem("favouritePokemon")) : [];
    
    if(favouriteArr.every(item => {return item.id !== this.props.data.id})) {
      favouriteArr.push(this.props.data);
      this.props.setPokemonList(favouriteArr);
      this.setState({isFavourite: true});
    } else {
      let index;
      favouriteArr.forEach( (item, arrIndex) => {
        item.id === this.props.data.id && (index = arrIndex);
      })
      favouriteArr.splice(index, 1);
      this.props.setPokemonList(favouriteArr);
      this.setState({isFavourite: false});
    }		
  }

  isFavourite = () => {
    this.setState({isFavourite: this.props.favouritePokemon.some(item => item.id === this.props.data.id)});
  }

  render () {
    return (
      <div className={styles.card} onClick={this.clickCard}>
        <div className={styles.cardPhoto}>
          <img src={this.props.data.ThumbnailImage}/>
        </div>
        <div className={styles.cardInfo}>
          <div className={styles.cardInfo__wrapper}>
            <p className={styles.cardInfo__id}>{`#${this.props.data.number}`}</p>
            <p className={styles.cardInfo__name}>{this.props.data.name}</p>
          </div>
          <div 
            className={styles.cardInfo__star + ' ' + (this.state.isFavourite && styles.active)} 
            onClick={this.clickStar}
          >
            <Star/>
          </div>
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

const mapDispatchToProps = dispatch => bindActionCreators({
  setPokemonList
}, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PokemonCard));