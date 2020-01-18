export const initialState = {
  authAttempted: false,
  auth: null,
  user: null,
  game: {
    choosedCategory: null,
    choosedDifficulty: null
  },
  favourites: null
};

export const appStateReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_AUTH_STATE':
      return {
        ...state,
        authAttempted: true,
        ...action.authState
      };
    case 'LOAD_USER':
      return {
        ...state,
        user: action.user
      };
    case 'CHANGE_FAVOURITES_STATE':
      return {
        ...state,
        favourites: action.favourites
      };
    case 'CHANGE_GAME_STATE':
      return {
        ...state,
        game: {
          ...state.game,
          ...action.game
        }
      };
    default:
      return state;
  }
};
