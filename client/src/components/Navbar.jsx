import "./Navbar.css";
import apLogo from "../assets/apparelpromo-logo.png";

export default function Navbar() {
  return (
    <div className="nav-container">
      <nav className="topnav responsive-container">
        <a className="logo-topnav" href="/">
          <img src={apLogo} className="logo-topnav" alt="Apparel Promo logo" />
        </a>
        <address>
          <a href="mailto:sales.apparelpromo@gmail.com">
            sales.apparelpromo@gmail.com
          </a>
          <br />
          <a href="tel:+15104719010">+1 (510) 471-9010</a>
          <br />
          <a href="https://maps.app.goo.gl/9Nq5XZajFQ1vYBSt9" target="_blank">
            780 Sandoval Way Hayward, CA 94544
          </a>
        </address>
      </nav>
    </div>
  );
}
