// Components/FilmItem.js

import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import {getImageFromApi} from '../API/TMBDApi';
import { TouchableOpacity } from "react-native-gesture-handler";

class FilmItem extends React.Component {
  render() {
    // console.log(this.props);
	const {film, displayDetailForFilm} = this.props;
    return (
      	<TouchableOpacity 
			style = {styles.main_container}
			onPress = {() => {displayDetailForFilm(film.id)}}
		>
			<View style={styles.image_container}>
				<Image style={styles.image} source={{uri: getImageFromApi(film.poster_path)}} />
			</View>

			<View style={styles.content_container}>
				<View style={styles.header_container}>
					<Text style={styles.title_text}>{film.title}</Text>
					<Text style={styles.vote_text}>{film.vote_average}</Text>
				</View>

				<View style={styles.description_container}>
					<Text style={styles.description_text} numberOfLines={6}>
						{film.overview}
					</Text>
				</View>
			

				<View style={styles.date_container}>
					<Text style={styles.date_text}>Sorti le {film.release_date}</Text>
				</View>
			</View>

      </TouchableOpacity>
    );
  }

}

const styles = StyleSheet.create({
  main_container: {
    height: 191,
    flexDirection: "row",
  },

  image: {
    width: 120,
    height: 180,
    margin: 5
  },
  content_container: {
    flexDirection: "column",
    flex: 1,
    margin: 5,
  },

  header_container: {
    flexDirection: "row",
    flex: 3,
  },
  title_text: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    flexWrap: "wrap",
  },
  vote_text: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#666",
  },

  description_container: {
    flex: 7,
  },
  description_text: {
    color: "#666",
    fontStyle: "italic",
  },
  date_container: {
    flex: 1,
  },
  date_text: {
    fontSize: 14,
    textAlign: "right",
  },
});

export default FilmItem;
