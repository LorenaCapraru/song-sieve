"use client";

import Image from "next/image";
import Link from "next/link";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  CurrentUser,
  isPopupConfirmOpenState,
  popupConfirmTextState,
  signUpState,
  SignUpState,
  userTypeState,
} from "../recoil/atoms";
import "../signin/page.css";
import "./page.css";
import { useEffect } from "react";

import { signUpUser } from "@/firebase/auth";
import { useRouter } from "next/navigation";
import GoogleGithub from "../signin/components/GoogleGithub";
import { addUserToDatabase } from "@/utils/utils";

export default function SignIn() {
  const router = useRouter();

  const [auth, setAuth] = useRecoilState<SignUpState>(signUpState);
  const [selectedOption, setSelectedOption] =
    useRecoilState<string>(userTypeState);
  const setIsPopupConfirmOpen = useSetRecoilState<boolean>(
    isPopupConfirmOpenState
  );
  const setPopupConfirmText = useSetRecoilState<string>(popupConfirmTextState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuth((prevAuth: SignUpState) => ({
      ...prevAuth,
      [name]: value,
      errors: { ...prevAuth.errors, [name]: "" },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, surname, email, password } = auth;
    let formIsValid = true;

    const newErrors = { name: "", surname: "", email: "", password: "" };

    if (name.trim() === "") {
      formIsValid = false;
      newErrors.name = "Name is required";
    }

    if (surname.trim() === "") {
      formIsValid = false;
      newErrors.surname = "Surname is required";
    }

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
        const fullName = `${auth.name} ${auth.surname}`;
        const userCredential = await signUpUser(auth, fullName);

        const user = userCredential.user;
        if (user && user.email) {
          let userName = "";
          let userSurname = "";
          if (user.displayName !== null) {
            const nameParts = user.displayName.split(" ");
            userName = nameParts[0];
            userSurname = nameParts[1];
          }

          const userInput: CurrentUser = {
            id: user.uid,
            image: "",
            name: userName,
            surname: userSurname,
            email: user.email,
            type: selectedOption,
          };

          addUserToDatabase(userInput);
        }

        console.log("Sign Up successful:", userCredential.user?.email);

        // Clear form fields and errors after successful signup
        setAuth({
          name: "",
          surname: "",
          email: "",
          password: "",
          errors: {
            name: "",
            surname: "",
            email: "",
            password: "",
          },
        });
        // redirect user to a sign-in page or new page)
        router.push("/signin");
        setPopupConfirmText(
          "You have been successfully registered! Please sign in now to access all the features of the Song Sieve."
        );
        setIsPopupConfirmOpen(true);
      } catch (error: any) {
        console.error("Error signing up:", error.message);
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
        name: "",
        surname: "",
        email: "",
        password: "",
        errors: {
          name: "",
          surname: "",
          email: "",
          password: "",
        },
      });
    };
  }, [setAuth]);

  //update background image on first load
  useEffect(() => {
    document.body.style.backgroundImage = "url(/background_images/back_4.webp)";
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
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                value={auth.name}
                onChange={handleInputChange}
              />
              <Image
                src="/icons/person-icon.svg"
                alt="Person"
                className="svg-icon"
                width={25}
                height={25}
              />
              <div className="error">{auth.errors.name}</div>
            </div>

            <div className="form-group">
              <input
                type="text"
                name="surname"
                className="form-control"
                placeholder="Surname"
                value={auth.surname}
                onChange={handleInputChange}
              />
              <Image
                src="/icons/person-icon.svg"
                alt="Person"
                className="svg-icon"
                width={25}
                height={25}
              />
              <div className="error">{auth.errors.surname}</div>
            </div>

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

            <div className="login-option">
              <label className="custom-radio">
                <input
                  type="radio"
                  name="userType"
                  value="volunteer"
                  checked={selectedOption === "volunteer"}
                  onChange={() => setSelectedOption("volunteer")}
                />

                <span className="custom-radio"></span>
                <p>Volunteer</p>
              </label>
              <label className="custom-radio">
                <input
                  type="radio"
                  name="userType"
                  value="trainee"
                  checked={selectedOption === "trainee"}
                  onChange={() => setSelectedOption("trainee")}
                />

                <span className="custom-radio"></span>
                <p>Trainee</p>
              </label>
            </div>

            <button type="submit" className="submit-btn">
              <span>SIGN UP</span>
            </button>
          </form>
        </div>

        <GoogleGithub />

        <div className="connect-container">
          <p>
            Already have an account!{" "}
            <Link href="/signin" className="sign-link">
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
