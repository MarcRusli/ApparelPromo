import "./Services.css";
import ServiceCard from "./ServiceCard";

export default function Services() {
  return (
    <section id="services">
      <div className="responsive-container services-shell">
        <header className="services-header">
          <p className="services-kicker">Services</p>
          <h2 className="services-title">What Can We Do For You?</h2>
          <p className="services-subtitle">
            Production-ready custom apparel and promo goods made for teams,
            businesses, and events.
          </p>
        </header>
        <div className="services-grid">
          <ServiceCard
            icon="🧵"
            name="Embroidery"
            description="Professional logo and design embroidery with precision and attention to detail."
            features={[
              "Logo embroidery",
              "Multi-color designs",
              "Hats & apparel specialization",
              "High thread count quality",
            ]}
          />
          <ServiceCard
            icon="🖨️"
            name="Screen Printing"
            description="High-quality screen printing for large quantities and vibrant, lasting results."
            features={[
              "Single & multi-color printing",
              "Bulk order discounts",
              "Specialty inks available",
              "Fast turnaround times",
            ]}
          />
          <ServiceCard
            icon="🎁"
            name="Promotional Products"
            description="Complete promotional merchandise solutions to boost your brand visibility and marketing impact."
            features={[
              "Custom bags & totes",
              "Branded merchandise",
              "Trade show giveaways",
              "Corporate gifts",
            ]}
          />
          <ServiceCard
            icon="👕"
            name="Uniform Programs"
            description="Consistent branded uniforms and employee apparel programs for growing teams."
            features={[
              "Department color coding",
              "Repeat order support",
              "On-brand logo placement",
              "Flexible size runs",
            ]}
          />
        </div>
      </div>
    </section>
  );
}
