import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: {
    _id: "65a862794c9b553b1403222b",
    profilePicture: "",
    coverPicture: "",
    followers: ["65a862754c9b553b14032229"],
    followings: ["65a862754c9b553b14032229", "65a862714c9b553b14032227"],
    isAdmin: false,
    username: "yone",
    email: "yone@yone.com",
    desc: "",
  },
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
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
