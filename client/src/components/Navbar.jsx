import "./Navbar.css";
import reactLogo from "../assets/react.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fas, far, fab);

export default function Navbar() {
  return (
    <div className="nav-container">
      <nav className="topnav responsive-container">
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo-topnav" alt="React logo" />
        </a>
        <ul className="nav-items">
          <li>asdf1</li>
          <li>asdf2</li>
          <li>
            <FontAwesomeIcon icon="fa-solid fa-cart-shopping" />
          </li>
        </ul>
      </nav>
    </div>
  );
}
