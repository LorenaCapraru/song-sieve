import { getAuth } from "firebase/auth";
import app from "./firebase";

const auth = getAuth(app);

// Sign Up
export const signUp = async (
  name: string,
  surname: string,
  email: string,
  password: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(email, password);
    // Further logic for updating user profile, etc., can be added here.
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Sign In
export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Sign Out
export const signOut = async () => {
  try {
    await firebase.auth().signOut();
  } catch (error) {
    throw error;
  }
};

// Get Current User
export const getCurrentUser = (): Promise<firebase.User | null> => {
  return new Promise<firebase.User | null>((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(
      (user: firebase.User | null) => {
        unsubscribe();
        resolve(user);
      },
      reject
    );
  });
};