import "./TrustBar.css";
import millsHighImg from "../assets/mills-high-school.jpg";
import gladTidingsImg from "../assets/glad-tidings-church.jpg";

export default function TrustBar() {
  return (
    <section id="trust-bar">
      <h2 className="trust-bar-title diminished">
        Trusted by Bay Area Businesses, Institutions, and Communities
      </h2>
      <div className="trusted-groups-container">
        <div className="trusted-group-card">
          <div className="trusted-group-card-header">
            <img
              src={millsHighImg}
              alt="Mills high school campus"
            />
          </div>
          <div className="trusted-group-card-body">
            <span className="tag tag-pink">School</span>
            <h4>Mills High School</h4>
            <p>Spiritwear, sports team jerseys, staff apparel.</p>
          </div>
        </div>

        <div className="trusted-group-card">
          <div className="trusted-group-card-header">
            <img
              src={gladTidingsImg}
              alt="Glad Tidings church"
            />
          </div>
          <div className="trusted-group-card-body">
            <span className="tag tag-teal">Church</span>
            <h4>Glad Tidings Church</h4>
            <p>ASDFASDF</p>
          </div>
        </div>

        <div className="trusted-group-card">
          <div className="trusted-group-card-header">
            <img
              src={gladTidingsImg}
              alt="Badminton"
            />
          </div>
          <div className="trusted-group-card-body">
            <span className="tag tag-purple">Community</span>
            <h4>Badminton</h4>
            <p>ASDFASDF</p>
          </div>
        </div>
      </div>
    </section>
  );
}
