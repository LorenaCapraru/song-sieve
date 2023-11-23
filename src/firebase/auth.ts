import {
  getAuth,
  createUserWithEmailAndPassword,
  Auth,
  UserCredential,
  signInWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  signOut,
} from "firebase/auth";
import { SignUpState, SingInState } from "../app/recoil/atoms";
import { auth } from "./firebase";

const authInstance: Auth = auth;

// Sign Up
export async function signUpUser(
  authData: SignUpState,
  fullName: string
): Promise<UserCredential> {
  const { email, password } = authData;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      authInstance,
      email,
      password
    );
    //to save the user's name
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: fullName,
      });
    }

    return userCredential;
  } catch (error: any) {
    console.error("Error signing up:", error.message);
    throw error;
  }
}

// Sign In
export async function signInUser(
  authData: SingInState
): Promise<UserCredential> {
  const { email, password } = authData;

  try {
    const userCredential = await signInWithEmailAndPassword(
      authInstance,
      email,
      password
    );
    return userCredential;
  } catch (error: any) {
    console.error("Error signing up:", error.message);
    throw error;
  }
}

// Sign Up/In with Google
export async function signUpWithGoogle(): Promise<UserCredential> {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(authInstance, provider);
    return result;
  } catch (error: any) {
    console.error("Error signing up with Google:", error.message);
    throw error;
  }
}

// Sign Up/In with GitHub
export async function signUpWithGitHub(): Promise<UserCredential> {
  const provider = new GithubAuthProvider();
  try {
    const result = await signInWithPopup(authInstance, provider);
    return result;
  } catch (error: any) {
    console.error("Error signing up with GitHub:", error.message);
    throw error;
  }
}

//sign out
export async function signOutUser(): Promise<void> {
  const auth: Auth = getAuth();
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error("Error signing out:", error.message);
    throw error;
  }
}
