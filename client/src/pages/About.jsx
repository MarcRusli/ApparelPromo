import "./About.css";
import apSign from "../assets/apparelpromo-sign.jpg";

export default function About() {
  return (
    <div className="about-container">
      <div className="about-container-text">
        <h1 className="about-header">We are your local custom apparel shop</h1>
        <p className="about-text">
          Founded in 1993, Apparel Promo offers you the resources and solutions
          you need to market your company effectively without breaking the bank.
        </p>
        <p className="about-text">
          At Apparel Promo, we provide custom apparel and promotional product
          solutions designed to elevate your brand and strengthen your company
          image. From classic polos and tees to high-performance gear and
          premium corporate wear, we offer a wide selection of quality products
          at competitive prices.
        </p>
        <p className="about-text">
          Our decorating and marketing experts do more than fulfill orders —
          they partner with you to find the perfect products that align with
          your goals, brand identity, and budget. Whether you need promotional
          tools to grow your business, thoughtful gifts for employees or
          clients, or merchandise for a special event, we’re here to support you
          every step of the way.
        </p>
        <p className="about-text">
          We take pride in delivering exceptional quality, unique designs, and
          outstanding customer service. With our in-house embroidery
          capabilities, we ensure fast, precise, and reliable results. We look
          forward to collaborating with you and bringing your next project to
          life.
        </p>
      </div>
      <img src={apSign} />
    </div>
  );
}
