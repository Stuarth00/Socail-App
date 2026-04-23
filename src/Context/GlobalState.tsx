// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { JSX, ReactNode } from "react";
import React, { createContext, useEffect, useReducer, useState } from "react";
import {
  type User,
  type State,
  type Post,
  type UserProfile,
} from "../Types/Interafaces";
import { ClipLoader } from "react-spinners";
// import { set } from "date-fns";

interface AppProviderType {
  handleHomeClick: () => void;
  handleUserProfileClick: () => void;
  handleSearchClick: () => void;
  handleAuthClick: () => void;
  handleEditProfileClick: () => void;
  state: State;
  dispatch: React.Dispatch<Action>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  LoadingSpinner: () => JSX.Element | null | undefined;
  asyncSimulate: (callback: () => void, delay?: number) => void;
}

const initialState: State = {
  users: [],
  currentUser: null,
  posts: [],
};

type Action =
  | { type: "REGISTER_USER"; payload: User }
  | { type: "LOGIN_USER"; payload: User }
  | { type: "LOGOUT" }
  | { type: "CREATE_POST"; payload: Post }
  | { type: "UPDATE_PROFILE"; payload: UserProfile };

function appReducer(state: State, action: Action): State {
  switch (action.type) {
    case "REGISTER_USER":
      console.log("Reducer called with action:", action);
      console.log("Initial state:", initialState);
      return {
        ...state,
        users: [...state.users, action.payload],
        currentUser: action.payload,
      };
    case "LOGIN_USER":
      console.log("Reducer called with action:", action);
      return { ...state, currentUser: action.payload };
    case "LOGOUT":
      console.log("Reducer called with action:", action);
      return { ...state, currentUser: null };
    case "CREATE_POST":
      if (!state.currentUser) return state;

      return {
        ...state,
        posts: Array.isArray(state.posts)
          ? [...state.posts, action.payload]
          : [action.payload],
      };
    case "UPDATE_PROFILE":
      if (!state.currentUser) return state;
      return {
        ...state,
        currentUser: action.payload,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user,
        ),
      };
    default:
      return state;
  }
}

export const AppContext = createContext<AppProviderType>({} as AppProviderType);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  //useReducer
  const KEY = "my_app_state";

  const init = (initialValue: State): State => {
    const persisted = localStorage.getItem(KEY);
    return persisted ? JSON.parse(persisted) : initialValue;
  };
  const [state, dispatch] = useReducer(appReducer, initialState, init);

  useEffect(() => {
    const stateToPersist = {
      ...state,
      users: state.users.map((user) => ({
        ...user,
        avatar: "",
      })),
    };
    const timeout = setTimeout(() => {
      localStorage.setItem(KEY, JSON.stringify(stateToPersist));
    }, 300);
    return () => clearTimeout(timeout);
  }, [state]);

  //Spinner
  const [loading, setLoading] = useState<boolean>(false);

  function LoadingSpinner(): JSX.Element | null | undefined {
    if (!loading) return null;
    return <ClipLoader color="#36d7b7" size={50} />;
  }

  const asyncSimulate = (callback: () => void, delay = 5000) => {
    setLoading(true);
    setTimeout(() => {
      callback();
      setLoading(false);
    }, delay);
  };

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
  const handleEditProfileClick = () => {
    navigate("/edit-profile");
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
        handleEditProfileClick,
        LoadingSpinner,
        loading,
        setLoading,
        asyncSimulate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
