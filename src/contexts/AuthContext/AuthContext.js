import React, { useEffect } from "react";
import { useReducer, createContext } from "react";
import { auth, storage } from "../../firebaseConfig";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
} from "firebase/auth";

import { v4 as uuid4 } from "uuid";

import {
  deleteObject,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";

import { provider } from "../../firebaseConfig";
import authReducer from "./AuthReducer";
import { clear } from "@testing-library/user-event/dist/clear";

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
    return sendPasswordResetEmail(auth, email);
  };

  const updateUserEmail = (email) => {
    if (email.trim() !== state.currentUser.email) {
      return updateEmail(state.currentUser, email);
    }
  };

  const updateUserPassword = (password) => {
    if (password.trim() !== "") {
      return updatePassword(state.currentUser, password);
    }
  };

  const uploadImage = async (image) => {
    if (image) {
      const storageRef = ref(storage, `userimages/${image.name + uuid4()}`);
      if (state.currentUser.photoURL) {
        try {
          const oldImgRef = ref(storage, state.currentUser.photoURL);
          await deleteObject(oldImgRef);
        } finally {
          return uploadBytes(storageRef, image);
        }
      }
    }
  };

  const updateUserProfile = (email, password, image) => {
    return Promise.all([
      updateUserEmail(email),
      updateUserPassword(password),
      uploadImage(image),
    ]);
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
        updateUserProfile,
        dispatch,
      }}
    >
      {!state.loading && children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
