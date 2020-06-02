import React from 'react';
import {
    StyleSheet, View, TextInput, Button, Text, FlatList
} from 'react-native';
import FilmItem from './FilmItem'
import {getFilmsFromApiWithSearchedText} from '../API/TMBDApi'

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            films : [],
            searchedText : ""
        };
    }

    // METHODES STATE 
    _loadFilms() {
        let text = this.state.searchedText;
        console.log(text);
        if (this.state.searchedText.length > 0) {
            getFilmsFromApiWithSearchedText(text).then(data => {
                this.setState({films : data.results});
            });    
        }
    }
    _searchTextInputChanged(text) {
        this.state.searchedText = text;
    }
    
    // RENDER
    render() {
        console.log("RENDER");
        return(
            <View style={{marginTop:20}}>
                <TextInput style = {styles.textinput} 
                placeholder="Titre du film" 
                onChangeText={(text) => this._searchTextInputChanged(text)}
                />
                <Button title="Rechercher" onPress={() => {this._loadFilms()}}/>
                <FlatList 
                    data = {this.state.films}
                    keyExtractor = {(item) => item.id.toString()}
                    renderItem = {({item}) => <FilmItem film={item}/>}
                />
            </View>
            
        )
    }
}

// STYLES
const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        marginTop: 20
    },
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5,
        backgroundColor: '#f0f0f0',
    }
})

export default Search;