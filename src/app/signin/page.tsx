import Image from "next/image";
import Link from "next/link";
import "./page.css";
import Input from "../components/CheckPlaylist/components/Input/Input";

function SignIn() {
  return (
    <div className="login-container">
      <div className="login-header">
      <Link href="/">
        <div className="logo-container">
          <Image src="/icons/logo.png" alt="logo" width={60} height={60} />
          <p>Song Sieve</p>
        </div>
      </Link>
      </div>

      <div className="form-container">
        <h2>Sign In</h2>
        <form className="">
          <div className="form-group">
            <input
              type="text"
              name="email"
              className="form-control"
              placeholder="Email"
            />
            <Image
              src="/icons/email-icon.svg"
              alt="Email"
              className="input-icon"
              width={25}
              height={25}
            />
            <div className="error"> </div>
          </div>

          <div className="form-group">
            <input
              type="text"
              name="password"
              className="form-control"
              placeholder="Password"
            />
            <Image
              src="/icons/lock-icon.svg"
              alt="Password"
              className="input-icon"
              width={25}
              height={25}
            />
            <div className="error"> </div>
          </div>

          <p>Forget Password?</p>

          <div className="submit">SING IN</div>
        </form>
      </div>



      <div className="connect-container">
        <p>Be connect with</p>

        <div className="icon-connect">
          <Image
            src="/icons/google-icon.svg"
            alt="Google icon"
            width={35}
            height={35}
          />
          <Image
          src="/icons/github-icon.svg"
          alt="GitHub icon"

          width={35}
          height={35}
          />
        </div>
        
        <p>Don’t have an account? <a>Sign up</a></p>
      </div>
      
    </div>
  );
}

export default SignIn;
