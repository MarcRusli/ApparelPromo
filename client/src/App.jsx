import "./App.css";

import Navbar from "./components/Navbar";
import QuickLinks from "./components/QuickLinks";
import Home from "./pages/Home";
import About from "./pages/About";

import { Routes, Route } from "react-router";
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/designer" element={<TShirtDesigner />} />
        <Route path="/about-us" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
