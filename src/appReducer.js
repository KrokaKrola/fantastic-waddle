export const initialState = {
  authAttempted: false,
  auth: null,
  user: null
};

export const appStateReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_AUTH_STATE":
      return {
        ...state,
        authAttempted: true,
        ...action.authState
      };
    case "LOAD_USER":
      return {
        ...state,
        user: action.user
      };
    default:
      return state;
  }
};
