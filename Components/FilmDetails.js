// Components/FilmDetails.js

import React from 'react'
import {StyleSheet, View, ActivityIndicator, Text, ScrollView, Image, Button} from 'react-native'
import { getFilmDetailsFromApi, getImageFromApi } from '../API/TMBDApi'
import { FlatList, SectionList, TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

class FilmDetails extends React.Component {
    // CONSTRUCTEUR ET METHODES SURCHARGES
    constructor(props) {
        super(props);
        this.idFilm  = this.props.navigation.route.params.idFilm;
        this.state = {
            isLoading : true,
            film: undefined
        };
    }
    componentDidMount() {
        console.log ("componentDidMount");
        console.log("Film id: " + this.idFilm);
        getFilmDetailsFromApi(this.idFilm).then(data => {
            this.setState(
            {
                film: data,
                isLoading: false
            }
            );
        });
    }
    componentDidUpdate() {
        console.log("componentDidUpdate : ");
        // console.log(this.props.favoritesFilm);
    }
    
    // FONCTIONS
    _displayLoading() {
        if (this.state.isLoading) {
            console.log("Display loading");
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size="large"/>
                </View>
            );
        }
    }
    _toggleFavorite() {
        const action = { type : 'TOGGLE_FAVORITE', value : this.state.film };
        this.props.dispatch(action);
    }
    _displayFavoriteImages() {
        var sourceImage = require ("../Images/ic_favorite_border.png");
        const filmIndex = this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id);
        if (filmIndex !== -1) {sourceImage = require("../Images/ic_favorite.png");}
        return (<Image source = {sourceImage} style = {styles.favorite_image}/>);
    }
    _displayFilm(){
        if (this.state.film != undefined) {
            console.log("Display Film");
            return(
                <ScrollView style = {styles.scrollview_container}>
                    <View style = {styles.header_container}>
                        <Image 
                            style={styles.image} 
                            source={{uri: getImageFromApi(this.state.film.poster_path)}}
                        />    
                    </View>
                    <View style ={styles.content_container}>
                        <Text style = {styles.title}>{this.state.film.title}</Text>

                        <TouchableOpacity 
                            style = {styles.favorite_container}
                            onPress = {() => this._toggleFavorite()} 
                        >
                            {this._displayFavoriteImages()}
                        </TouchableOpacity>
                        
                        <Text style = {styles.overview_text}>
                            {this.state.film.overview}
                        </Text>
                    </View>
                    <View style = {styles.details_container}>
                        <Text style = {styles.details_text}>Sorti le {this.state.film.release_date}</Text>
                        <Text style = {styles.details_text}>Note : {this.state.film.vote_average}</Text>
                        <Text style = {styles.details_text}>Nombres de votes : {this.state.film.vote_count}</Text>
                        <Text style = {styles.details_text}>Budget : {this.state.film.budget}</Text>
                        <Text style = {styles.details_text}> 
                            Genre : 
                            {
                                this.state.film.genres.map(
                                    (genre) => {return genre.name}
                                ).join(" / ")
                            } 
                        
                        </Text>
                        <Text style = {styles.details_text}>
                            Companie :  
                            {
                                this.state.film.production_companies.map(
                                    company => {return company.name}
                                ).join(" / ")
                            }
                        </Text>
                    </View>
                </ScrollView>       
            );
        }
    }

    // RENDER
    render() {
        console.log("Render");
        return (
            <View style = {styles.main_container}>
                {this._displayLoading()}
                {this._displayFilm()}
            </View>
        )
        
    }
}
// STYLES 
const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollview_container: {
        flex: 1,
    },

    header_container: {
    }
    ,image : {
        height : 150,
        margin: 5
    },

    content_container: {
        marginTop: 10,
        marginBottom: 20
        
    },
    title : {
        fontSize : 28,
        fontWeight: 'bold',
        textAlign : 'center',
        marginBottom: 5
    },
    favorite_container: {
        alignItems: 'center',
    },
    favorite_image: {
        width: 40,
        height: 40
    },

    overview_text: {
        marginTop: 10,
        paddingLeft: 5
    },
    details_text : {
        fontWeight : 'bold',
        paddingLeft: 5 
    }

});

// REDUX
const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}
export default connect(mapStateToProps)(FilmDetails);
