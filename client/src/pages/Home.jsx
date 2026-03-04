import Hero from "../components/Hero";
import TrustBar from "../components/TrustBar";
import Services from "../components/Services";
import Advantages from "../components/Advantages";
import Marquee from "../components/Marquee";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <TrustBar />
      <Services />
      <Advantages />
    </>
  );
}