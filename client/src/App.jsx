import "./App.css";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import QuickLinks from "./components/QuickLinks";
import { library } from "@fortawesome/fontawesome-svg-core";

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fas, far, fab);

function App() {
  return (
    <>
      <Navbar />
      <QuickLinks />
      <Hero />
    </>
  );
}

export default App;
