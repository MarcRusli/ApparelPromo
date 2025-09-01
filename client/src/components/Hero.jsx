import "./Hero.css";
import TrustIndicator from "./TrustIndicator";
import heroImage from "../assets/apparelpromo-hero.png";

export default function Hero() {
  return (
    <section id="hero">
      <div className="text-container">
		<span class="hero-badge">Bay Area's Premier Custom Apparel</span>
        <h1 class="hero-title">Custom Embroidery & Screen Printing Excellence</h1>
        <p className="subheading diminished">
          Professional custom apparel solutions for businesses, teams, and
          events. From design to delivery, we make your brand stand out.
        </p>
				<ul className="core-services">
					<li><a href="_">Embroidery</a></li>
					<li><a href="_">Screen Printing</a></li>
					<li><a href="_">Digital Transfer</a></li>
					<li><a href="_">Promotional Products</a></li>
				</ul>
				<span>Get Free Quote</span>
				<span>View Our Work</span>
				<ul className="trust-indicators">
					<TrustIndicator text={"Local Hayward Business"} />
					<TrustIndicator text={"20+ Years Experience"} />
					<TrustIndicator text={"Quality Guaranteed"} />
				</ul>
      </div>
      <img className="hero-image" src={heroImage}></img>
    </section>
  );
}
