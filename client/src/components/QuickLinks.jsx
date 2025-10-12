import "./QuickLinks.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function QuickLinks() {
  return (
    <div className="nav-container subnav-container">
      <nav className="responsive-container subnav">
        <ul className="quicklinks">
          <li>
            <a href="/designer">Create Your Shirt</a>
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
        <span><span style={{fontSize: "1.7em"}}><FontAwesomeIcon icon="fa-solid fa-cart-shopping" /></span> Cart</span>
      </nav>
    </div>
  );
}
