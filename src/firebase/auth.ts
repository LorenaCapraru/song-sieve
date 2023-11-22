import {
  getAuth,
  createUserWithEmailAndPassword,
  Auth,
  UserCredential,
} from "firebase/auth";
import { SignUpState } from "../app/recoil/atoms";

const authInstance: Auth = getAuth(); // Initialize Firebase auth instance

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
