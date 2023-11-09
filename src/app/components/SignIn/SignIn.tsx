import Image from "next/image";

function SignIn() {
  return (
    <>
      <div className="login-header">
        <div className="logo-container">
          <Image src="/icons/logo.png" alt="logo" width={60} height={60} />
          <p>Song Sieve</p>
        </div>

        <div className="login-container">
          <p>Log in</p>
          <Image
            src="/icons/login-icon.svg"
            alt="logo"
            width={35}
            height={35}
          />
        </div>
      </div>
    </>
  );
}

export default SignIn;
