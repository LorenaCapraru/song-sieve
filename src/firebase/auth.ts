import {
  Auth,
  getAuth,
  UserCredential,
  signInWithEmailAndPassword as signIn,
} from "firebase/auth";

import { auth } from "./firebase";

const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);

// Sign Up
// export const signUpWithEmailAndPassword = async (
//   email: string,
//   password: string
// ) => {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     // Additional logic after successful sign-up
//     return userCredential.user;
//   } catch (error: any) {
//     console.error("Error signing up:", error.message);
//     throw error;
//   }
// };

// Sign In
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(
      email,
      password
    );
    return userCredential.user;
  } catch (error: any) {
    console.error("Error signing up:", error.message);
    throw error;
  }
};
/*
// Sign Out
export const signOut = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    throw error;
  }
};

// Get Current User
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      user => {
        unsubscribe();
        resolve(user);
      },
      reject
    );
  });
};
*/
