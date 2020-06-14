// Components/Favorites.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import ListFilms from './ListFilms';

class Favorites extends React.Component {

    render(){
        
        return(
            <View style = {styles.main_container}>
                <ListFilms 
                    films = {this.props.favoritesFilm}
                    navigation = {this.props.navigation}
                    favoriteListe = {true}
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
        favoritesFilm: state.favoritesFilm
    }
}
export default connect(mapStateToProps)(Favorites);