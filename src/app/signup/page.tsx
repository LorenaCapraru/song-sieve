"use client";

import Image from "next/image";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { authState, AuthState, userTypeState } from "../recoil/atoms";
import "../signin/page.css";

export default function SignIn() {
  const [auth, setAuth] = useRecoilState<AuthState>(authState);
  const [selectedOption, setSelectedOption] =
    useRecoilState<string>(userTypeState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuth((prevAuth: AuthState) => ({
      ...prevAuth,
      [name]: value,
      errors: { ...prevAuth.errors, [name]: "" },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
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
      // Reset errors on successful form submission
      setAuth((prevAuth) => ({
        ...prevAuth,
        errors: { name: "", surname: "", email: "", password: "" },
      }));
      // Handle successful login
      console.log("Sign Up successful:", email);
    }
  };

  return (
    <main className="bg-template auth-template">
      <section className="login-container">
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
              <p>
                <label>
                  <input
                    type="radio"
                    name="userType"
                    value="volunteer"
                    checked={selectedOption === "volunteer"}
                    onChange={() => setSelectedOption("volunteer")}
                  />
                  Volunteer
                </label>{" "}
                -{" "}
                <label>
                  <input
                    type="radio"
                    name="userType"
                    value="trainee"
                    checked={selectedOption === "trainee"}
                    onChange={() => setSelectedOption("trainee")}
                  />
                  Trainee
                </label>
              </p>
            </div>

            <button type="submit" className="submit-btn">
              <span>SIGN UP</span>
            </button>
          </form>
        </div>

        <div className="connect-container">
          <p>Be connect with</p>

          <div className="icon-connect">
            <Image
              src="/icons/google-icon.svg"
              alt="Google icon"
              width={40}
              height={40}
              className="icon"
              style={{
                filter: "invert(100%)",
                border: "1px solid black",
                borderRadius: "50%",
                padding: "5px",
                background: "white",
              }}
            />
            <Image
              src="/icons/github-icon.svg"
              alt="GitHub icon"
              width={40}
              height={40}
              className="icon"
              style={{
                filter: "invert(100%)",
                border: "1px solid black",
                borderRadius: "50%",
                padding: "5px",
                background: "white",
              }}
            />
          </div>

          <div className="connect-container">
            <p>
              Already have an account!{" "}
              <Link href="/signin" className="sign-link">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
