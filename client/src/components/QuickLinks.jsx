import "./QuickLinks.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";

export default function QuickLinks() {
  return (
    <div className="nav-container subnav-container">
      <nav className="responsive-container subnav">
        <ul className="quicklinks">
          <li>
            <Link to="/designer">Create Your Shirt</Link>
          </li>
          <li>
            <Link to="/quote">Quick Quote</Link>
          </li>
          <li>
            <Link to="/screen-print">Screen Print</Link>
          </li>
          <li>
            <Link to="/embroidery">Embroidery</Link>
          </li>
          <li>
            <Link to="/about-us">About</Link>
          </li>
        </ul>
        <span><span style={{fontSize: "1.7em"}}><FontAwesomeIcon icon="fa-solid fa-cart-shopping" /></span> Cart</span>
      </nav>
    </div>
  );
}
