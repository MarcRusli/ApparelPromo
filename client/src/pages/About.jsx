import "./About.css";

export default function About() {
  return (
    <section className="about-section">
      <div className="about-container">
        <figure className="about-media">
          <img
            src="/embroidery-screen-print-bts.png"
            alt="Apparel Promo team member working on embroidery and screen printing"
          />
        </figure>
        <div className="about-container-text">
          <p className="about-kicker">About Apparel Promo</p>
          <h1 className="about-header">We are your local custom apparel shop</h1>
          <p className="about-text">
            Founded in 1993, Apparel Promo offers you the resources and
            solutions you need to market your company effectively without
            breaking the bank.
          </p>
          <p className="about-text">
            At Apparel Promo, we help bring your brand to life with custom
            apparel and promotional products that make a lasting impression.
            Whether you are looking for everyday polos and tees or high-tech
            performance gear and stylish corporate wear, we have a wide range of
            quality options at great prices.
          </p>
          <p className="about-text">
            Our team of decorating and marketing experts is here to do more than
            just fill your order. We are here to help you find the right
            products for your goals, your brand, and your budget. From company
            giveaways and client gifts to team uniforms and special events, we
            will guide you through every step.
          </p>
          <p className="about-text">
            We take pride in unique designs, top-notch craftsmanship, and
            reliable service. With our in-house embroidery team, we can turn
            around projects quickly and with close attention to detail.
          </p>
        </div>
      </div>
    </section>
  );
}
