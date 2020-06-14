// Components/Search.js

import React from 'react';
import {
    StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';

import {getFilmsFromApiWithSearchedText} from '../API/TMBDApi';
import ListFilms from './ListFilms';

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.searchedText = "";
        this.page = 0;
        this.totalPages = 0;
        this.state = {
            films : [],
            isLoading: false,
        };
        this._loadFilms = this._loadFilms.bind(this);
    }
    componentDidMount() {
        console.log("Props:" + this.props);
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
        let text = this.searchedText;
        console.log("Searched Text: " + text);

        this.setState({isLoading: true});
        if (this.searchedText.length > 0) {
            getFilmsFromApiWithSearchedText(text, this.page + 1).then((data) => {
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
        this.searchedText = text;
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
        // console.log(this.props.navigation);
        console.log("RENDER");
        console.log("Is loading : " + this.state.isLoading)
        console.log("State:" + this.state);
        return(
            <View style={{marginTop:20}}>
                <TextInput 
                    style = {styles.textinput} 
                    placeholder="Titre du film" 
                    onChangeText={(text) => this._searchTextInputChanged(text)}
                    onSubmitEditing= {() => this._searchFilms()}
                />
                <Button title="Rechercher" onPress={() => this._searchFilms()}/>

                <ListFilms 
                    films = {this.state.films}
                    navigation = {this.props.navigation}
                    loadFilms = {this._loadFilms}
                    page = {this.page}
                    totalPages = {this.totalPages}
                    favoriteList = {false}
                />
                {this._displayLoading()}
            </View>     
           
        );
    }
}

// STYLES
const styles = StyleSheet.create({
    main_container: 
    {
        flex: 1,
    },
    textinput: 
    {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5,
        backgroundColor: '#f0f0f0',
    },
    loading_container: 
    {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 200,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
// REDUX
const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}
export default connect(mapStateToProps)(Search);

