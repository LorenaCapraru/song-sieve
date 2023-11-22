import {
  getAuth,
  createUserWithEmailAndPassword,
  Auth,
  UserCredential,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { SignUpState, SingInState } from "../app/recoil/atoms";
import { auth } from "./firebase";

const authInstance: Auth = auth;

// Sign Up
export async function signUpUser(
  authData: SignUpState
): Promise<UserCredential> {
  const { email, password } = authData;

  try {
    const userCredential = await createUserWithEmailAndPassword(
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