export const ErrorReducer = (state, action) => {
  switch (action.type) {
    case "SET_ERROR":
      return {
        isError: true,
        message: action.payload?.message,
        type: action.payload?.type,
      };
    case "CLEAR_ERROR":
      return {
        isError: false,
        message: "",
        type: "",
      };

    default:
      return state;
  }
};
