import "./QuickLinks.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function QuickLinks() {
  return (
    <div className="nav-container bottom">
      <nav className="responsive-container subnav">
        <ul className="quicklinks">
          <li>
            <a href="_">Custom T-shirts</a>
          </li>
          <li>
            <a href="_">Create Your Shirt</a>
          </li>
        </ul>
        <span style={{color: "white"}}><FontAwesomeIcon icon="fa-solid fa-cart-shopping" /></span>
      </nav>
    </div>
  );
}
