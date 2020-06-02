import React from 'react';
import {
    StyleSheet, View, TextInput, Button, Text, FlatList
} from 'react-native';
import films from '../Helpers/filmsData'
import FilmItem from './FilmItem'

class Search extends React.Component {
    // RENDER
    render() {
        return(
            <View style={{marginTop:20}}>
                <TextInput style = {styles.textinput} placeholder="Titre du film"/>
                <Button title="Rechercher" onPress={() => {}}/>
                <FlatList 
                    data = {films}
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