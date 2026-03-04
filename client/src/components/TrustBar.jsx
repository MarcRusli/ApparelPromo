import "./TrustBar.css";
import millsHighImg from "../assets/mills-high-school.jpg";
import gladTidingsImg from "../assets/glad-tidings-church.jpg";

export default function TrustBar() {
  return (
    <section id="trust-bar">
      <div className="responsive-container trust-bar-shell">
        <h2 className="trust-bar-title">
          Trusted by Bay Area Businesses, Institutions, and Communities
        </h2>
        <div className="trusted-groups-container">
          <div className="trusted-group-card">
            <div className="trusted-group-card-header">
              <img src={millsHighImg} alt="Mills high school campus" />
            </div>
            <div className="trusted-group-card-body">
              <h4>Schools</h4>
              <p>Spiritwear, sports team jerseys, and staff apparel.</p>
            </div>
          </div>

          <div className="trusted-group-card">
            <div className="trusted-group-card-header">
              <img src={gladTidingsImg} alt="Glad Tidings church group photo" />
            </div>
            <div className="trusted-group-card-body">
              <h4>Churches</h4>
              <p>Event shirts, volunteer uniforms, and ministry branding.</p>
            </div>
          </div>

          <div className="trusted-group-card">
            <div className="trusted-group-card-header">
              <img src="/local-badminton-sports-club-team-photo.png" alt="Badminton community group" />
            </div>
            <div className="trusted-group-card-body">
              <h4>Sports Clubs</h4>
              <p>Team jerseys, tournament shirts, and supporter merch.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
