// API/TMBDApi.js
const API_TOKEN = "d4ee936fdf48437a2f1a574b11f0e90f";

	// Récupération des films de la recherc
export function getFilmsFromApiWithSearchedText(text, page) {
	const url =
		"https://api.themoviedb.org/3/search/movie?api_key=" +
		API_TOKEN +
		"&language=fr&query=" + text + "&page=" + page;
		return fetch(url)
			.then((reponse) => reponse.json())
			.catch((error) => console.error(error)); 
}
	// Récupération des images des films affichés
export function getImageFromApi(name) {
	return (
		"https://image.tmdb.org/t/p/w300" + name
	)
}
	// Récupération détail du film
export function getFilmDetailsFromApi(id) {
	const url = "https://api.themoviedb.org/3/movie/" +
	id + "?api_key=" + API_TOKEN + "&language=fr";
	return fetch(url)
		.then((reponse) => reponse.json())
		.catch((error) => console.log(error));
	
}
