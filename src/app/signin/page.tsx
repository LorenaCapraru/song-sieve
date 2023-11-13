"use client"

import Image from "next/image";
import Link from "next/link";
import "./page.css";
import { useRecoilState } from "recoil";
import { authState, AuthState} from "../recoil/atoms"

function SignIn() {
  const [auth, setAuth] = useRecoilState<AuthState>(authState)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
    const { name, value} = e.target;
    setAuth ((prevAuth) => ({
      ...prevAuth,
      [name]: value,
      errors: {...prevAuth.errors, [name]: ""}
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const {email, password} = auth;
    let formIsValid = true;

    const newErrors = {email: "", password: ""};

    if (email.trim() === "") {
      formIsValid = false;
      newErrors.email = "Email is required"
    }

     if (password.trim() === "") {
      formIsValid = false;
      newErrors.password = "Password is required"
    }

    if (!formIsValid) {
     setAuth ((prevAuth) => ({
      ...prevAuth,
      errors: newErrors,

      }));
    } else {
      // Handle successfull login
      console.log("Logged in:", email)
    }
    
  };

  return (
    <section className="login-bg">
    <div className="login-container">
      <div className="login-header">
      <Link
        href="/"
        style={{ 
          textDecoration: 'none'
        }}>
        <div className="logo-container">
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
              className="input-icon"
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
              className="input-icon"
              width={25}
              height={25}
            />
            <div className="error">{auth.errors.password}</div>
          </div>

          <div className="Forget-password">
            <p >Forget Password?</p>
          </div>

          <button type="submit" className="submit-btn"><span>SIGN IN</span></button>

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
              filter: 'invert(100%)',
              border: '1px solid black',
              borderRadius: '50%',
              padding:'5px',
              background: 'white'}} 
          />
          <Image
          src="/icons/github-icon.svg"
          alt="GitHub icon"
          width={40}
          height={40}
          className="icon"
          style={{ 
            filter: 'invert(100%)',
            border: '1px solid black',
            borderRadius: '50%',
            padding: '5px',
            background: 'white'
          }} 


          />
        </div>
        
        <p>Don’t have an account? <a>Sign up</a></p>
      </div>
      
    </div>
    </section>
  );
}

export default SignIn;
