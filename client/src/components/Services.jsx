import "./Services.css";
import ServiceCard from "./ServiceCard";

export default function Services() {
  return (
    <section id="services">
      <h2>What Can We Do For You?</h2>
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
        icon="🧵"
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
        icon="🧵"
        name="Screen Printing"
        description="High-quality screen printing for large quantities and vibrant, lasting results."
        features={[
          "Single & multi-color printing",
          "Bulk order discounts",
          "Specialty inks available",
          "Fast turnaround times",
        ]}
      />
    </section>
  );
}
