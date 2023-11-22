import { signUpWithGitHub, signUpWithGoogle } from "@/firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function GoogleGithub() {
  const router = useRouter();

  const handleGoogleSignUp = async () => {
    try {
      const result = await signUpWithGoogle();

      console.log("Google Sign Up successful:", result.user?.email);
      router.push("/");
    } catch (error: any) {
      console.error("Error signing up with Google:", error.message);
      // Handle Google sign-up error
    }
  };

  const handleGithubSignUp = async () => {
    try {
      const result = await signUpWithGitHub();

      console.log("GitHub Sign Up successful:", result.user?.email);
      router.push("/");
    } catch (error: any) {
      console.error("Error signing up with GitHub:", error.message);
      // Handle GitHub sign-up error
    }
  };
  return (
    <div>
      <div className="connect-container">
        <p>Be connect with</p>

        <div className="icon-connect">
          <Image
            src="/icons/google-icon.svg"
            alt="Google icon"
            width={40}
            height={40}
            onClick={handleGoogleSignUp}
            className="icon"
            style={{
              border: "1px solid black",
              borderRadius: "50%",
              padding: "5px",
              background: "white",
              filter: "invert(100%)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = "none";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = "invert(100%)";
            }}
          />
          <Image
            src="/icons/github-icon.svg"
            alt="GitHub icon"
            width={40}
            height={40}
            className="icon"
            onClick={handleGithubSignUp}
            style={{
              border: "1px solid black",
              borderRadius: "50%",
              padding: "5px",
              background: "white",
              filter: "invert(100%)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = "none";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = "invert(100%)";
            }}
          />
        </div>
      </div>
    </div>
  );
}