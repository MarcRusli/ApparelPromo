import "./QuickLinks.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";
import { quickLinks } from "./quickLinksData";

export default function QuickLinks() {
  return (
    <div className="nav-container subnav-container">
      <nav className="responsive-container subnav">
        <ul className="quicklinks">
          {quickLinks.map(({ to, label, badge }) => (
            <li key={to}>
              <Link to={to}>
                {label}
                {badge ? <span className="coming-soon-badge">{badge}</span> : null}
              </Link>
            </li>
          ))}
        </ul>
        <span>
          <span style={{ fontSize: "1.7em" }}>
            <FontAwesomeIcon icon="fa-solid fa-cart-shopping" />
          </span>{" "}
          Cart <span className="coming-soon-badge">Coming Soon</span>
        </span>
      </nav>
    </div>
  );
}
