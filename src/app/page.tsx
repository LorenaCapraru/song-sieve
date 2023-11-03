"use client";

import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth } from "@/firebase/firebase";

export default function Home() {
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      if (user && user.email) {
        const email = user.email;
        console.log("Signed in with email:", email);
      }
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.error("Error signing in with Google:", errorCode, errorMessage);
    }
  };

  return (
    <div>
      Home
      {/* <button onClick={handleGoogleSignIn}>Sign in google</button>

      <button>Sign up</button> */}
    </div>
  );
}
