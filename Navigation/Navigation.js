// Navigation/Navigation.js

import React from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Favorites from  '../Components/Favorites';
import Search from '../Components/Search';
import FilmDetails from '../Components/FilmDetails';
import FilmVu from '../Components/FilmVu';
import { StackActions } from 'react-navigation';

function SearchScreen({navigation}) {
	return (
        <Search navigation = {navigation}/>
	);
}
function FilmDetailsScreen(navigation) {
    return (
        <FilmDetails navigation = {navigation} />
    );
}
function FavoritesScreen({navigation}) {
    return (
        <Favorites navigation = {navigation} />
    );
}

function SearchTab({navigation}) {
    const StackSearch = createStackNavigator();
    return (
        <StackSearch.Navigator>
            <StackSearch.Screen 
                name="Rechercher" 
                component={SearchScreen}
            />
            <StackSearch.Screen
                name = "Détails du Film"
                component = {FilmDetailsScreen}
            />
        </StackSearch.Navigator>
    );
}
function FavoritesTab({navigation}) {
    const StackFav = createStackNavigator();
    return (
        <StackFav.Navigator>
            <StackFav.Screen
                name = "Favoris"
                component={FavoritesScreen}
            />
            <StackFav.Screen
                name = "Détails du Film"
                component = {FilmDetailsScreen}
            />
        </StackFav.Navigator>
    );
}

function FilmVuScreen({navigation}) {
    return (
        <FilmVu navigation = {navigation} />
    );
}
function FilmVuTab({navigation}) {
    const StackFilmVu = createStackNavigator();
    return (
        <StackFilmVu.Navigator>
            <StackFilmVu.Screen
                name = "Films Vus"
                component={FilmVuScreen}
            />
            <StackFilmVu.Screen
                name = "Détails du Film"
                component = {FilmDetailsScreen}
            />
        </StackFilmVu.Navigator>
    );
}
const Tab = createBottomTabNavigator();
export default class Navigation extends React.Component {
    
    render() {
        return (
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions = {
                        ({ route }) => ({
                            tabBarIcon: () => {
                                let iconName;

                                if (route.name == 'Search') {
                                    iconName = require("../Images/ic_search.png");
                                }
                                else if (route.name == 'Favorites') {
                                   iconName = require("../Images/ic_favorite.png") 
                                }
                                else if(route.name='Films Vus') {
                                    iconName = require("../Images/ic_films_vu.png");
                                }
                                return (<Image source ={iconName} style={styles.tab_icon} />)
                            }
                        })
                    }
                    tabBarOptions = {
                    {
                        showLabel: false,
                        activeBackgroundColor: '#f5f5f5',
                        inactiveBackgroundColor: '#fff'                
                    }
                    }
                >
                    <Tab.Screen name="Search" component={SearchTab} />
                    <Tab.Screen name="Favorites" component={FavoritesTab} />
                    <Tab.Screen name="Films Vus" component={FilmVuTab} />
                </Tab.Navigator>
            </NavigationContainer>
    
        );   
    }
}

const styles = StyleSheet.create({
    tab_icon: 
    {
        width: 30,
        height: 30,
    }
})
