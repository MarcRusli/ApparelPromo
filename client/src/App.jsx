import "./App.css";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import QuickLinks from "./components/QuickLinks";
import TrustBar from "./components/TrustBar";
import Services from "./components/Services";
import Advantages from "./components/Advantages";
import { library } from "@fortawesome/fontawesome-svg-core";

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import TShirtDesigner from "./components/TShirtDesigner";

library.add(fas, far, fab);

function App() {
  return (
    <>
      <Navbar />
      <QuickLinks />
      <Hero />
      <TrustBar />
      <Services />
      <Advantages />
      <TShirtDesigner />
    </>
  );
}

export default App;
