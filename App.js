import React from 'react';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import Store from './Store/configureStore';

import Navigation from './Navigation/Navigation';

export default class App extends React.Component {
  render(){
    return (
        <Provider store = {Store}>
        	<Navigation />
        </Provider>
    );  
  }
}


