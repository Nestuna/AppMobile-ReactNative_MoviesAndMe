// Components/FadeIn.js
import React from 'react';
import { Animated, Stylesheet, Dimensions } from 'react-native';

class FadeIn extends React.Component {
    // CONSTRUCTEUR
    constructor(props) {
        super(props);
        this.state = {
            leftPosition: new Animated.Value(Dimensions.get('window').width)
        };
    }
    componentDidMount() {
        this.setState(
            {
                leftPosition: 0
            }
        ).start();
    }
    render(){
        return(
            <Animated style = {{left: this.state.leftPosition}}>
                {this.props.children}
            </Animated> 
        );
    }
}

export default FadeIn;