// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ReactNode } from "react";
import React, { createContext, useEffect, useReducer } from "react";
import { type User, type State } from "../Types/Interafaces";

interface AppProviderType {
  handleHomeClick: () => void;
  handleUserProfileClick: () => void;
  handleSearchClick: () => void;
  handleAuthClick: () => void;
  state: State;
  dispatch: React.Dispatch<Action>;
}

const initialState: State = {
  users: [],
  currentUser: null,
};

type Action =
  | { type: "REGISTER_USER"; payload: User }
  | { type: "LOGIN_USER"; payload: User }
  | { type: "LOGOUT" };

function authReducer(state: State, action: Action): State {
  switch (action.type) {
    case "REGISTER_USER":
      console.log("Reducer called with action:", action);
      return { ...state, users: [...state.users, action.payload] };
    case "LOGIN_USER":
      console.log("Reducer called with action:", action);
      return { ...state, currentUser: action.payload };
    case "LOGOUT":
      console.log("Reducer called with action:", action);
      return { ...state, currentUser: null };
    default:
      return state;
  }
}

console.log("Initial state:", initialState);

export const AppContext = createContext<AppProviderType>({} as AppProviderType);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  //useReducer
  const KEY = "my_app_state";

  const init = (initialValue: State): State => {
    const persisted = localStorage.getItem(KEY);
    return persisted ? JSON.parse(persisted) : initialValue;
  };
  const [state, dispatch] = useReducer(authReducer, initialState, init);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(state));
  }, [state]);

  //Routes
  const navigate = useNavigate();
  //   const location = useLocation();

  const handleHomeClick = () => {
    navigate("/");
  };
  const handleUserProfileClick = () => {
    navigate("/user-profile");
  };
  const handleSearchClick = () => {
    navigate("/search");
  };
  const handleAuthClick = () => {
    navigate("/auth");
  };

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        handleHomeClick,
        handleUserProfileClick,
        handleSearchClick,
        handleAuthClick,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
