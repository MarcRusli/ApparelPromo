import "./Hero.css";
import heroImage from "../assets/apparelpromo-hero.png";

export default function Hero() {
  return (
    <section id="hero">
      <div className="text-container">
        <h1>Custom Embroidery & Screen Printing Excellence</h1>
        <p>
          Professional custom apparel solutions for businesses, teams, and
          events. From design to delivery, we make your brand stand out.
        </p>
				<ul className="core-services">
					<li><a href="_">Embroidery</a></li>
					<li><a href="_"></a>Screen Printing</li>
					<li><a href="_">Digital Transfer</a></li>
					<li><a href="_">Other Promotional Products</a></li>
				</ul>
				<span>Get Free Quote</span>
				<span>View Our Work</span>
				<ul className="trust-indicators">
					<li>Local Hayward Business</li>
					<li>20+ Years Experience</li>
					<li>Quality Guaranteed</li>
				</ul>
      </div>
      <img className="hero-image" src={heroImage}></img>
    </section>
  );
}
