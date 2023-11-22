import {
  getAuth,
  createUserWithEmailAndPassword,
  Auth,
  UserCredential,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { SignUpState } from "../app/recoil/atoms";
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
  authData: SignInState
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
