import { createStore, combineReducers } from 'redux';
import toggleFavorite from './Reducers/favoriteReducers';

export default createStore(combineReducers({toggleFilmVu, toggleFavorite}));
