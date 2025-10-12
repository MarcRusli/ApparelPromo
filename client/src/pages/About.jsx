import "./About.css";
import apSign from "../assets/apparelpromo-sign.jpg";
import Footer from "../components/Footer";

export default function About() {
  return (
    <>
      <div className="about-container">
        <div className="about-container-text">
          <h1 className="about-header">
            We are your local custom apparel shop
          </h1>
          <p className="about-text">
            Founded in 1993, Apparel Promo offers you the resources and
            solutions you need to market your company effectively without
            breaking the bank.
          </p>
          <p className="about-text">
            At Apparel Promo, we help bring your brand to life with custom
            apparel and promotional products that make a lasting impression.
            Whether you’re looking for everyday polos and tees or high-tech
            performance gear and stylish corporate wear, we’ve got a wide range
            of quality options at great prices.
          </p>
          <p className="about-text">
            Our team of decorating and marketing experts is here to do more than
            just fill your order — we’re here to help you find the perfect
            products that fit your goals, your brand, and your budget. From
            company giveaways and client gifts to team uniforms and special
            events, we’ll guide you through every step of the process.
          </p>
          <p className="about-text">
            We take pride in creating unique designs, delivering top-notch
            craftsmanship, and providing friendly, reliable service. With our
            in-house embroidery team, we can turn around your projects quickly
            and with great attention to detail. We can’t wait to work with you
            and help make your next project a success!
          </p>
        </div>
        <img src={apSign} />
      </div>
    </>
  );
}
