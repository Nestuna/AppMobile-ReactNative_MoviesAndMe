// Store/Reducers/favoriteReducer.js

const initialState = { favoritesFilm: []};

function toggleFavorite(state, action) {
    let nextState;
    switch (action.type) {
        case 'TOGGLE_FAVORITE':
            const favoritesFilmIndex = state.favoritesFilm.findIndex(
                (item) => {item.id === action.value.id;}
            );
            if (favoriteFilmIndex !== -1) {
                // Le film est dans les favories => suppression
                nextState = 
                {
                    ...state,
                    favoritesFilm: state.favoritesFilm.filter(
                        (item, index) => {index !== favoritesFilmIndex;}
                    )
                }
            }
            else {
                // Le film n'est pas dans les favoris => ajout
                nextState = 
                {
                    ...state,
                    favoritesFilm: [...state.favoritesFilm, action.value]
                }
            }
            
            return nextState || state;
        default:
            return state;
    }
}
export default toggleFavorite;