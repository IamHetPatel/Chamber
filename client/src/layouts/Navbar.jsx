import { ConnectButton } from "@rainbow-me/rainbowkit";
import "../styles/navbarstyle.css";

const NavBar = () => {
  return (
    <div className="nav-container">
      <div className="title-container">
        <p className="title">Chamber</p>
      </div>
      <div className="menu-container">
        <div className="menu-option">Notification</div>
        <div className="menu-option">Profile</div>
        <div className="menu-option"><ConnectButton /></div>
      </div>
    </div>
  );
};

export default NavBar;
