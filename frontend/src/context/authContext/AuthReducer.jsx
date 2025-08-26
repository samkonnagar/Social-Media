export const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false
      };
    case "LOGOUT":
      return {
        user: null,
        isFetching: false
      };

    default:
      return state;
  }
};
