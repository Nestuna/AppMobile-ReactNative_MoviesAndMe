// Components/FilmDetails.js

import React from 'react'
import {StyleSheet, View, Text} from 'react-native'

export default class FilmDetail extends React.Component {
    render() {
        console.log(this.props.navigation);
        const id = this.props.navigation.route.params.idFilm;
        console.log(id);
        return (
            <View style = {styles.main_container}>
                <Text>Détail du film {id}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    }
})