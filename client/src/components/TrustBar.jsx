import "./TrustBar.css";
export default function TrustBar() {
  return (
    <section id="trust-bar">
      <h2 className="diminished">Trusted by Bay Area Businesses, Institutions, and Communities</h2>
      <ul className="trusted-groups-container">
        <li className="trusted-group">
          <img src="_" alt="" />
          <figcaption>Mills High School</figcaption>
        </li>
        <li className="trusted-group">
          <img src="_" alt="" />
          <figcaption>Glad Tidings Church</figcaption>
        </li>
        <li className="trusted-group">
          <img src="_" alt="" />
          <figcaption>... Badminton</figcaption>
        </li>
      </ul>
    </section>
  );
}
