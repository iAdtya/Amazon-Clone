import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebaase/firebaseInit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const authContext = createContext();

export function useAuthValue() {
  const value = useContext(authContext);
  return value;
}

export function AuthContext({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  async function createUser(email, password) {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("New user Created, Please LogIn to Continue !!");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("This email address is already in use by another account.");
      } else if (error.code === "auth/invalid-email") {
        toast.error("The email address is not valid.");
      } else if (error.code === "auth/weak-password") {
        toast.error(
          "The password is not strong enough. It must be at least 6 characters long."
        );
      } else {
        toast.error(error.message);
      }
    }
  }

  async function signIn(email, password) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Sign In Successfully!!!");
    } catch (error) {
      toast.error(error.message);
    }
  }

  function signOut() {
    firebaseSignOut(auth);
    toast.success("Sign Out Successfully!!!!");
  }

  const value = {
    currentUser,
    createUser,
    signIn,
    signOut,
  };

  return (
    <authContext.Provider value={value}>
      <ToastContainer />
      {!loading && children}
    </authContext.Provider>
  );
}
