import "./ServiceCard.css";

export default function ServiceCard({ icon, name, description, features }) {
  return (
    <div className="service-card">
      <div className="service-icon">{icon}</div>
      <h3>{name}</h3>
      <p>{description}</p>
      <ul className="service-features">
        {features.map((feature, i) => (
          <li key={i}>{feature}</li>
        ))}
      </ul>
      <button className="service-cta">Learn More</button>
    </div>
  );
}
