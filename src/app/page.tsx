import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import MobileMenu from "./components/MobielMenu/MobileMenu";
import SideBar from "./components/SideBar/SideBar";
import RootLayout from "./layout";

export default function Home() {
  return (
    <div className="bg-template home-template">
      <Header />
      <SideBar />
      <Main />
      <MobileMenu />
    </div>
  );
}
