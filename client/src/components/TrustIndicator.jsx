import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./TrustIndicator.css";

export default function TrustIndicator({ text }) {
  return (
    <li className="trust-indicator">
      <span style={{ color: "green" }}>
        <FontAwesomeIcon icon="fa-solid fa-circle-check" />
      </span>{" "}
      <span className="diminished">{text}</span>
    </li>
  );
}
