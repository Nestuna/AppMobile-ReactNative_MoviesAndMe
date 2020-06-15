// Components/Favorites.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import ListFilms from './ListFilms';

class FilmVu extends React.Component {

    render(){
        console.log("Films Vus: " + this.props.filmsVus);
        return(
            <View style = {styles.main_container}>
                <ListFilms 
                    films = {this.props.filmsVus}
                    navigation = {this.props.navigation}
                    favoriteListe = {false}
                    filmsVusList = {true}
                />
            </View>
            );
    }
}

// STYLES
const styles = StyleSheet.create({
    main_container: {
        flex:1
    },
    text:
    {   
        marginTop: 50,
        fontSize: 32
    }
});

// REDUX
const mapStateToProps = (state) => {
  return {
	 favoritesFilm: state.toggleFavorite.favoritesFilm,
	 filmsVus: state.toggleFilmVu.filmsVus
  };
};

export default connect(mapStateToProps)(FilmVu);