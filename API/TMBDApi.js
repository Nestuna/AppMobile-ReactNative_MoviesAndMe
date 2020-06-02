// API/TMBDApi.js
const API_TOKEN = "d4ee936fdf48437a2f1a574b11f0e90f";

export function getFilmsFromApiWithSearchedText(text) {
  const url =
    "https://api.themoviedb.org/3/search/movie?api_key=" +
    API_TOKEN +
    "&language=fr&query=" + text;
    return fetch(url)
        .then((reponse) => reponse.json())
        .catch((error) => console.error(error)) 
}
