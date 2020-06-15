// Components/FilmDetails.js

import React from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  ScrollView,
  Image,
  Button,
  Share,
  Platform,
  TouchableOpacity
} from "react-native";
import { getFilmDetailsFromApi, getImageFromApi } from "../API/TMBDApi";

import { connect } from "react-redux";

import EnlargeShrink from "./EnlargeShrink";

class FilmDetails extends React.Component {
  // CONSTRUCTEUR ET METHODES SURCHARGES
  constructor(props) {
    super(props);
    this.idFilm = this.props.navigation.route.params.idFilm;
    this.state = {
      isLoading: true,
      film: undefined,
      shouldEnlarge: false,
    };
  }
  componentDidMount() {
    console.log("componentDidMount");
    console.log("Film id: " + this.idFilm);
    getFilmDetailsFromApi(this.idFilm).then((data) => {
      this.setState({
        film: data,
        isLoading: false,
      });
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
          <ActivityIndicator size="large" />
        </View>
      );
    }
  }
  _toggleFavorite() {
	 const action = { type: "TOGGLE_FAVORITE", value: this.state.film };
    this.props.dispatch(action);
  }
  _toggleFilmVu() {
		const action = { type: "TOGGLE_FILMVU", value: this.state.film };
		this.props.dispatch(action);
  }
  _displayFilmVuText() {
		let text = "Marquer comme vu";
		const filmIndex = this.props.filmsVus.findIndex(
			(item) => item.id === this.state.film.id
		);  
		if (filmIndex !== -1) {
			text = "Marquer comme non vu";
		}

		return text;
  }
  _displayFavoriteImages() {
    let sourceImage = require("../Images/ic_favorite_border.png");
    let shouldEnlarge = false;
    const filmIndex = this.props.favoritesFilm.findIndex(
      (item) => item.id === this.state.film.id
    );
    if (filmIndex !== -1) {
      sourceImage = require("../Images/ic_favorite.png");
      shouldEnlarge = true;
    }
    return (
      <EnlargeShrink shouldEnlarge={shouldEnlarge}>
        <Image source={sourceImage} style={styles.favorite_image} />
      </EnlargeShrink>
    );
  }

  _shareFilm() {
		const { film } = this.state;
		console.log("titre: " + film.title + "content: " + film.overview)
		Share.share({  message: film.title + " : " + film.overview });
  }
  _displayFloatingActionButton() {
		const { film } = this.state;
		if (film !== undefined && Platform.OS === 'ios') {
			let shareImage = require('../Images/ic_share.ios.png');
			return (
				<TouchableOpacity
					onPress = {() => this._shareFilm()}
					style= {styles.image_share_touchable}
				>
					<Image
						style = {styles.image_share}
						source = {shareImage}
					/>

				</TouchableOpacity>
			);
	  }
  }

  _displayFilm() {
    if (this.state.film != undefined) {
		console.log("Display Film");
		console.log("Films Vus:" + this.props.filmsVus)
		console.log("Films favoris:" + this.props.favoritesFilm)

		return (
        <View style={styles.scrollview_container}>
				<View style={styles.header_container}>
					<Image
					style={styles.image}
					source={{ uri: getImageFromApi(this.state.film.poster_path) }}
					/>
				</View>
          	<View style={styles.content_container}>
					<Text style={styles.title}>{this.state.film.title}</Text>

					<TouchableOpacity
					style={styles.favorite_container}
					onPress={() => this._toggleFavorite()}
					>
					{this._displayFavoriteImages()}
					</TouchableOpacity>

					<Text style={styles.overview_text}>{this.state.film.overview}</Text>
          	</View>
          	<View style={styles.details_container}>
					<Text style={styles.details_text}>
					Sorti le {this.state.film.release_date}
					</Text>
					<Text style={styles.details_text}>
					Note : {this.state.film.vote_average}
					</Text>
					<Text style={styles.details_text}>
					Nombres de votes : {this.state.film.vote_count}
					</Text>
					<Text style={styles.details_text}>
					Budget : {this.state.film.budget}
					</Text>
					<Text style={styles.details_text}>
					Genre :
					{this.state.film.genres
						.map((genre) => {
							return genre.name;
						})
						.join(" / ")}
					</Text>
					<Text style={styles.details_text}>
					Companie :
					{this.state.film.production_companies
						.map((company) => {
							return company.name;
						})
						.join(" / ")}
					</Text>
          	</View>
				<Button 
					title = {this._displayFilmVuText()} 
					onPress = {() => this._toggleFilmVu()} />
       	</View>
      );
    }
  }

  // RENDER
  render() {
    console.log("Render");
    return (
      <ScrollView style={styles.main_container}>
        {this._displayLoading()}
        {this._displayFilm()}
		  {this._displayFloatingActionButton()}
      </ScrollView>
    );
  }
}
// STYLES
const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  loading_container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollview_container: {
    flex: 1,
  },

  header_container: {},
  image: {
    height: 150,
    margin: 5,
  },

  content_container: {
    marginTop: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  favorite_container: {
    alignItems: "center",
  },
  favorite_image: {
    flex: 1,
    width: null,
    height: null,
  },

  overview_text: {
    marginTop: 10,
    paddingLeft: 5,
  },
  details_text: {
    fontWeight: "bold",
    paddingLeft: 5,
  },
image_share_touchable: {
	alignItems: 'center',
	marginTop: 20

},
 image_share: {
	width: 30,
	height: 30,
 }

});

// REDUX
const mapStateToProps = (state) => {
  return {
	 favoritesFilm: state.toggleFavorite.favoritesFilm,
	 filmsVus: state.toggleFilmVu.filmsVus
  };
};
export default connect(mapStateToProps)(FilmDetails);
