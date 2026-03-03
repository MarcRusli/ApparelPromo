import { useState } from "react";
import "./Navbar.css";
import apLogo from "../assets/apparelpromo-logo.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="nav-container">
      <nav className="topnav responsive-container">
        <a className="logo-topnav" href="/">
          <img src={apLogo} className="logo-topnav" alt="Apparel Promo logo" />
        </a>
        <button
          className="nav-hamburger"
          type="button"
          aria-label="Open contact menu"
          aria-expanded={menuOpen}
          aria-controls="nav-contact-menu"
          onClick={toggleMenu}
        >
          <span className="nav-hamburger-bar" />
          <span className="nav-hamburger-bar" />
          <span className="nav-hamburger-bar" />
        </button>
        <address className="nav-contact">
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
      <div
        id="nav-contact-menu"
        className={`nav-mobile-menu ${menuOpen ? "is-open" : ""}`}
      >
        <ul className="nav-mobile-links" onClick={closeMenu}>
          <li>
            <a href="/designer">Create Your Shirt</a>
          </li>
          <li>
            <a href="/quote">Quick Quote</a>
          </li>
          <li>
            <a href="/screen-print">Screen Print</a>
          </li>
          <li>
            <a href="/embroidery">Embroidery</a>
          </li>
          <li>
            <a href="/about-us">About</a>
          </li>
        </ul>
        <address onClick={closeMenu}>
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
      </div>
    </div>
  );
}
