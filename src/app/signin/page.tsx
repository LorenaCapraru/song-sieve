"use client";

import Image from "next/image";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { singInState, SingInState } from "../recoil/atoms";
import "./page.css";
import { useEffect } from "react";

import { signInUser } from "@/firebase/auth";
import { useRouter } from "next/navigation";
import GoogleGithub from "./components/GoogleGithub";

export default function SignIn() {
  const router = useRouter();

  const [auth, setAuth] = useRecoilState<SingInState>(singInState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuth((prevAuth) => ({
      ...prevAuth,
      [name]: value,
      errors: { ...prevAuth.errors, [name]: "" },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = auth;
    let formIsValid = true;

    const newErrors = { email: "", password: "" };

    if (email.trim() === "") {
      formIsValid = false;
      newErrors.email = "Email is required";
    }

    if (password.trim() === "") {
      formIsValid = false;
      newErrors.password = "Password is required";
    }

    if (!formIsValid) {
      setAuth((prevAuth) => ({
        ...prevAuth,
        errors: newErrors,
      }));
    } else {
      try {
        const userCredential = await signInUser(auth);

        console.log("Logged in:", userCredential.user?.email);

        // Clear form fields and errors
        setAuth({
          email: "",
          password: "",
          errors: {
            email: "",
            password: "",
          },
        });

        // redirect user to dashboard or new page)
        router.push("/");
      } catch (error: any) {
        console.error("Error signing in:", error.message);
        setAuth((prevAuth) => ({
          ...prevAuth,
          errors: { ...prevAuth.errors, email: error.message },
        }));
      }
    }
  };

  useEffect(() => {
    return () => {
      setAuth({
        email: "",
        password: "",
        errors: {
          email: "",
          password: "",
        },
      });
    };
  }, [setAuth]);

  //update background image on first load
  useEffect(() => {
    document.body.style.backgroundImage =
      "url(/background_images/background_3.jpg)";
  }, []);

  return (
    <main className="bg-template auth-template">
      <section className="login-wrapper">
        <div className="login-header">
          <Link href="/" className="login-link">
            <div className="logo-wrapper">
              <Image src="/icons/logo.png" alt="logo" width={60} height={60} />
              <p>Song Sieve </p>
            </div>
          </Link>
        </div>

        <div className="form-container">
          <h2>Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
                value={auth.email}
                onChange={handleInputChange}
              />
              <Image
                src="/icons/email-icon.svg"
                alt="Email"
                className="svg-icon"
                width={25}
                height={25}
              />
              <div className="error">{auth.errors.email}</div>
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                value={auth.password}
                onChange={handleInputChange}
              />
              <Image
                src="/icons/lock-icon.svg"
                alt="Password"
                className="svg-icon"
                width={25}
                height={25}
              />
              <div className="error">{auth.errors.password}</div>
            </div>

            <div className="forgot-password">
              <p>Forgot Password?</p>
            </div>

            <button type="submit" className="submit-btn">
              <span>SIGN IN</span>
            </button>
          </form>
        </div>

        <GoogleGithub />

        <div className="connect-container">
          <p>
            Don’t have an account?{" "}
            <Link href="/signup" className="sign-link">
              Sign up
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
