// Store/Reducers/filmVuReducers.js

const initialState = { filmsVus: []};

function toggleFilmVu(state = initialState, action) {
    let nextState;
    switch (action.type) {
        case 'TOGGLE_FILMVU':
            const filmsVusIndex = state.filmsVus.findIndex(
                item => item.id === action.value.id
            );
            if (filmsVusIndex !== -1) {
                // Le film est dans les films vus => suppression
                nextState = {
                    ...state,
                    filmsVus: state.filmsVus.filter(
                        (item, index) => index !== filmsVusIndex
                    )
                }
            }
            else {
                // Le film n'est pas dans les films vus => ajout
                nextState = {
                    ...state,
                    filmsVus: [...state.filmsVus, action.value]
                }
            }
            return nextState || state;
        default:
            return state;
    }
}
export default toggleFilmVu;