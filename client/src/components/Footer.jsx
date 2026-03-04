import "./Footer.css";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer id="footer">
      <div className="responsive-container footer-container">
        <div className="footer-brand">
          <h3>Apparel Promo</h3>
          <p>
            Family-owned custom apparel shop serving schools, teams, churches,
            and businesses since 1993.
          </p>
        </div>

        <nav className="footer-column" aria-label="Footer navigation">
          <h4>Company</h4>
          <Link to="/">Home</Link>
          <Link to="/about-us">About</Link>
          <Link to="/quote">Quick Quote</Link>
          <Link to="/designer">Designer</Link>
        </nav>

        <nav className="footer-column" aria-label="Footer services">
          <h4>Services</h4>
          <Link to="/screen-print">Screen Print</Link>
          <Link to="/embroidery">Embroidery</Link>
          <a href="/#services">Promotional Products</a>
          <a href="/#services">Uniform Programs</a>
        </nav>

        <address className="footer-column footer-contact">
          <h4>Contact</h4>
          <a href="mailto:sales.apparelpromo@gmail.com">
            sales.apparelpromo@gmail.com
          </a>
          <a href="tel:+15104719010">+1 (510) 471-9010</a>
          <a href="https://maps.app.goo.gl/9Nq5XZajFQ1vYBSt9" target="_blank">
            780 Sandoval Way, Hayward, CA
          </a>
        </address>
      </div>
      <div className="footer-bottom">
        <div className="responsive-container footer-bottom-inner">
          <span>© {new Date().getFullYear()} Apparel Promo</span>
          <div className="footer-bottom-links">
            <Link to="/about-us">About</Link>
            <Link to="/quote">Get Quote</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
