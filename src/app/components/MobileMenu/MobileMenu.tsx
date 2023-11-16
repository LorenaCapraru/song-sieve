import "./MobileMenu.css";
import Image from "next/image";
import Link from "next/link";

const MobileMenu = () => {
  return (
    <nav className="mobile-menu">
      <ul>
        <li>
          <Link href="/">
            <Image
              src="/icons/home-icon.svg"
              alt="Home"
              width={25}
              height={25}
            />
            <p>Home</p>
          </Link>
        </li>
        <li>
          <Link href="/favourite-tracks">
            <Image
              src="/icons/heart-icon.svg"
              alt="Favourite tracks"
              width={25}
              height={25}
            />
            <p>
              Favourite <br />
              tracks
            </p>
          </Link>
        </li>
        <li>
          <Link href="/my-library">
            <Image
              src="/icons/bookmark-icon.svg"
              alt="My library"
              width={25}
              height={25}
            />
            <p>My library</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MobileMenu;
