import "./Navbar.css";
import apLogo from "../assets/apparelpromo-logo.png";

export default function Navbar() {
  return (
    <div className="nav-container">
      <nav className="topnav responsive-container">
        <img src={apLogo} className="logo-topnav" alt="Apparel Promo logo" />
        <address>
          <a href="mailto:sales.apparelpromo@gmail.com">
            sales.apparelpromo@gmail.com
          </a>
          <br />
          <a href="tel:+15104719010">+1 (510) 471-9010</a>
          <br />
          <a href="_">780 Sandoval Way Hayward, CA 94544</a>
        </address>
      </nav>
    </div>
  );
}
