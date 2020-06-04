import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Navigation from './Navigation/Navigation';

export default class App extends React.Component {
  render(){
    return (
      	<Navigation />
    )  
  }
}


