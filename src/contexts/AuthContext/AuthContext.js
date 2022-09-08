import React, { useEffect } from "react";
import { useReducer, createContext } from "react";
import { auth } from "../../firebaseConfig";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  sendPasswordResetEmail
} from "firebase/auth";

import { provider } from "../../firebaseConfig";
import authReducer from "./AuthReducer";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, {
    currentUser: null,
    loading: true,
  });

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };

  const signInWithGoogle = () => {
    return signInWithPopup(auth, provider);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth,email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch({ type: "SET_CURRENT_USER", payload: user });
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signUp,
        signIn,
        logOut,
        signInWithGoogle,
        resetPassword,
        dispatch,
      }}
    >
      {!state.loading && children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
