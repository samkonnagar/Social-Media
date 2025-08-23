import { createContext, useContext, useReducer } from "react";
import { ErrorReducer } from "./ErrorReducer";

const INITIAL_STATE = {
  isError: false,
  message: "",
  type: "",
};
export const ErrorContext = createContext(INITIAL_STATE);

export function errorObj() {
  return useContext(ErrorContext);
}

export const ErrorProvider = ({ children }) => {
  const [state, errorDispatch] = useReducer(ErrorReducer, INITIAL_STATE);

  return (
    <ErrorContext.Provider
      value={{
        isError: state.isError,
        errMessage: state.message,
        errType: state.type,
        errorDispatch,
      }}
    >
      {children}
    </ErrorContext.Provider>
  );
};
