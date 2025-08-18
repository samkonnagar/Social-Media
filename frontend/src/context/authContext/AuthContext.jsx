import { createContext, useContext, useReducer } from "react";
import { AuthReducer } from "./AuthReducer";

const INITIAL_STATE = {
  user: null,
  isFetching: false,
  error: false,
};
export const AuthContext = createContext(INITIAL_STATE);

export function data() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
