// Components/Films.js
import React from 'react';
import {
    StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import FilmItem from './FilmItem'

class ListFilms extends React.Component {
    // CONSTRUCTEUR
    constructor(props) {
        super(props);
        this.state = {
            films: []
        };
    }

    // NAVIGATION (STACK)
    _displayDetailForFilm = (idFilm) => {
        console.log("Display film with id : " + idFilm);
        this.props.navigation.navigate('Détails du Film', {idFilm : idFilm});
    }

    // STATE REDUX
    _isFavorite(item) {
        let isFavorite = 
        (this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false;
        return isFavorite
    }
    


    // RENDER
    render() {
        return (
            <FlatList 
            data = {this.props.films}
            extraData = {this.props.favoritesFilm}
            keyExtractor = {(item) => item.id.toString()}
            renderItem = {
                ({item}) => 
                <FilmItem film={item} 
                    displayDetailForFilm = {this._displayDetailForFilm}
                    isFavorite = {this._isFavorite(item)} />
            }
            onEndReachedThreshold = {0.5}
            onEndReached = {() => {
                console.log("onReachedEnd !")
                if (!this.props.favoriteList && this.props.page < this.props.totalPages) {this.props.loadFilms()}
            }}
            />
        );
    }
}

//REDUX
const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}
export default connect(mapStateToProps)(ListFilms)