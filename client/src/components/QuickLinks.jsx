import "./QuickLinks.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function QuickLinks() {
  return (
    <div className="responsive-container">
      <nav className="subnav">
        <ul className="quicklinks">
          <li>
            <a href="_">Custom T-shirts</a>
          </li>
          <li>
            <a href="_">Create Your Shirt</a>
          </li>
        </ul>
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
