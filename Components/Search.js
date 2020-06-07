// Components/Search.js

import React from 'react';
import {
    StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator
} from 'react-native';
import FilmItem from './FilmItem'
import {getFilmsFromApiWithSearchedText} from '../API/TMBDApi'

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.page = 0
        this.totalPages = 0
        this.state = {
            films : [],
            searchedText : "",
            isLoading: false,
        };
    }

    // NAVIGATION
    _displayDetailForFilm = (idFilm) => {
        console.log("Display film with id : " + idFilm);
        this.props.navigation.navigate('Détails du Film', {idFilm : idFilm});
    }

    // STATE 
    _searchFilms() {
        this.page = 0
        this.totalPages = 0
        this.setState (
            {films: []},
            () => {
                console.log("Page : " + this.page + "\n" + "Pages Totales : " 
                + this.totalPages + "Taille de la liste : " + this.state.films.length)
            }
        );
        this._loadFilms()
    }
    _loadFilms() {
        let text = this.state.searchedText;
        console.log(text);
        this.setState({isLoading: true});
        if (this.state.searchedText.length > 0) {
            getFilmsFromApiWithSearchedText(text, this.page + 1).then(data => {
                // console.log(data);
                this.page = data.page
                this.totalPages = data.total_pages
                this.setState(
                {
                    films: this.state.films.concat(data.results),
                    isLoading: false
                }
                );
            });    
        }
    }
    _searchTextInputChanged(text) {
        this.state.searchedText = text;
    }
    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size="large"/>
                </View>
            )
        }
    }
    // RENDER
    render() {
        console.log(this.props.navigation);
        console.log("RENDER");
        console.log("Is loading : " + this.state.isLoading)
        return(
            <View style={{marginTop:20}}>
                <TextInput 
                    style = {styles.textinput} 
                    placeholder="Titre du film" 
                    onChangeText={(text) => this._searchTextInputChanged(text)}
                    onSubmitEditing= {() => this._searchFilms()}
                />
                <Button title="Rechercher" onPress={() => this._searchFilms()}/>
                <FlatList 
                    data = {this.state.films}
                    keyExtractor = {(item) => item.id.toString()}
                    renderItem = {({item}) => <FilmItem film={item} 
                        displayDetailForFilm = {this._displayDetailForFilm} />}
                    onEndReachedThreshold = {0.5}
                    onEndReached = {() => {
                        console.log("onReachedEnd !")
                        if (this.page < this.totalPages) {this._loadFilms()}
                    }}
                />
                {this._displayLoading()}
            </View>     
        )
    }
}

// STYLES
const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5,
        backgroundColor: '#f0f0f0',
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 200,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Search;