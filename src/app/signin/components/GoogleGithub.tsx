import {
  CurrentUser,
  isPopupConfirmOpenState,
  popupConfirmTextState,
} from "@/app/recoil/atoms";
import { signUpWithGitHub, signUpWithGoogle } from "@/firebase/auth";
import { addUserToDatabase } from "@/utils/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";

export default function GoogleGithub() {
  const router = useRouter();
  const setIsPopupConfirmOpen = useSetRecoilState<boolean>(
    isPopupConfirmOpenState
  );
  const setPopupConfirmText = useSetRecoilState<string>(popupConfirmTextState);

  const handleGoogleSignUp = async () => {
    try {
      const userCredential = await signUpWithGoogle();
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
          type: "Volunteer",
        };

        addUserToDatabase(userInput);
      }

      console.log("Google Sign Up successful:", userCredential.user?.email);
      router.push("/");
      setPopupConfirmText("You have been successfully logged in!");
      setIsPopupConfirmOpen(true);
    } catch (error: any) {
      console.error("Error signing up with Google:", error.message);
      // Handle Google sign-up error
    }
  };

  const handleGithubSignUp = async () => {
    try {
      const userCredential = await signUpWithGitHub();

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
          type: "Volunteer",
        };

        addUserToDatabase(userInput);
      }

      console.log("GitHub Sign Up successful:", userCredential.user?.email);
      router.push("/");
      setPopupConfirmText("You have been successfully logged in!");
      setIsPopupConfirmOpen(true);
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
