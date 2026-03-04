import "./Hero.css";
import { Link } from "react-router";

export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-left">
        <p className="hero-label">
          Family Owned and Operated Business Since 1993
        </p>
        <h1 className="hero-headline">
          Wear Your
          <br />
          <em>Brand.</em>
          Own The
          <br />
          Room.
        </h1>
        <p className="hero-sub">
          Based in Hayward, we locally craft custom embroidery, screen printing,
          and branded apparel for teams, companies, and creators who refuse to
          blend in.
        </p>
        <div className="hero-actions">
          <Link to="/quote">
            <button className="btn-primary">Get a Free Quote</button>
          </Link>

          <a href="#services" className="btn-ghost">
            See Our Work
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <path
                d="M0 6H14M9 1L14 6L9 11"
                stroke="currentColor"
                stroke-width="1.5"
              />
            </svg>
          </a>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <div className="stat-num">
              20<span>+</span>
            </div>
            <div className="stat-label">Years In Business</div>
          </div>
          <div className="stat">
            <div className="stat-num">
              1<span>k+</span>
            </div>
            <div className="stat-label">Happy Clients</div>
          </div>
          <div className="stat">
            <div className="stat-num">
              7<span>day</span>
            </div>
            <div className="stat-label">Avg. Turnaround</div>
          </div>
        </div>
      </div>
      <div className="hero-right">
        <img
          className="hero-image"
          src="/hero-image.png"
          alt="Hero image of custom apparel"
        />
      </div>
    </section>
  );
}
