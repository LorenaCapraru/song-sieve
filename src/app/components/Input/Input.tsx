import Image from "next/image";
import "./Input.css";
const Input = () => {
  return (
    <div className="input-section">
      <Image
        src="/icons/spotify-icon.svg"
        alt="spotify brand"
        width={16}
        height={16}
        className="icon"
      />
      <input
        type="text"
        value=""
        placeholder="Spotify playlist id"
        className="input-field"
      />
    </div>
  );
};

export default Input;
