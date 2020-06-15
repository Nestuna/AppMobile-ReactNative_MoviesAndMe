import { createStore, combineReducers } from 'redux';
import toggleFavorite from './Reducers/favoriteReducers';
import toggleFilmVu from './Reducers/filmVuReducers';

export default createStore(combineReducers({toggleFilmVu, toggleFavorite}));
