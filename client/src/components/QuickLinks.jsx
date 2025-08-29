import "./QuickLinks.css";

export default function QuickLinks() {
  return (
    <div className="responsive-container">
      <nav>
        <ul className="quicklinks">
          <li>
            <a href="_">Custom T-shirts</a>
          </li>
          <li>
            <a href="_">Create Your Shirt</a>
          </li>
        </ul>
      </nav>
      <address>
        <a href="mailto:sales.apparelpromo@gmail.com">
          sales.apparelpromo@gmail.com
        </a>
        <br />
        <a href="tel:+15104719010">+1 (510) 471-9010</a>
        <br />
        <a href="_">780 Sandoval Way Hayward, CA 94544</a>
      </address>
    </div>
  );
}
