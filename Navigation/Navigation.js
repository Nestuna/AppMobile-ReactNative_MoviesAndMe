// Navigation/Navigation.js

import React from 'react';
import {
    StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator
} from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Search from '../Components/Search'
import FilmDetails from '../Components/FilmDetails'

function SearchScreen({navigation}) {
	return (
        <Search navigation = {navigation}/>
	)
}
function FilmDetailsScreen(navigation) {
    return (
        <FilmDetails navigation = {navigation} />
    )
}
const Stack = createStackNavigator();
export default class Navigation extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>

                    <Stack.Screen 
                        name="Rechercher" 
                        component={SearchScreen}
                    />
                    <Stack.Screen
                        name = "Détails du Film"
                        component = {FilmDetailsScreen}
                    />

                </Stack.Navigator>
            </NavigationContainer>
    
        );   
    }
}


