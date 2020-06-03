// API/TMBDApi.js
const API_TOKEN = "d4ee936fdf48437a2f1a574b11f0e90f";

export function getFilmsFromApiWithSearchedText(text, page) {
  const url =
    "https://api.themoviedb.org/3/search/movie?api_key=" +
    API_TOKEN +
    "&language=fr&query=" + text + "&page=" + page;
    return fetch(url)
        .then((reponse) => reponse.json())
        .catch((error) => console.error(error)) 
}

export function getImageFromApi(name) {
  return (
    'https://image.tmdb.org/t/p/w300' + name
  )
}