import React from 'react';
import {StyleSheet, View, TextInput, Button, Text} from 'react-native';

class Search extends React.Component {
    // RENDER
    render() {
        return(
            // <View style={{marginTop:20}}>
            //     <TextInput style = {styles.textinput} placeholder="Titre du film"/>
            //     <Button title="Rechercher" onPress={() => {}}/>
            // </View>
            <View style={styles.main_container}>
                {/* <View style={{ flex: 1, backgroundColor: 'red' }}></View>
                <View style={{ flex: 2, backgroundColor: 'green' }}></View>
                <View style={{ flex: 3, backgroundColor: 'blue' }}></View> */}
                <View style={{ height: 50, width: 50, backgroundColor: 'yellow' }}></View>
                <View style={{ height: 50, width: 50, backgroundColor: 'brown' }}></View>
                <View style={{ height: 50, width: 50, backgroundColor: 'silver' }}></View>
            </View>
        )
    }
}

// STYLES
const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-evenly",
        alignItems: 'flex-start',
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