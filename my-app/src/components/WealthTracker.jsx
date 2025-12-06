import { useState, React } from "react";
// import "./WealthTracker.module.css";

import HeroSection from "./HeroSection";
import Section2 from "./Section2";
import Navbar from "./Navbar";
import Section4 from "./Section4";
import Section3 from "./Section3";
import Accordion from "./Accordion";
import Footer from "./Footer";
import ReviewMyportfolioForm from "./ReviewMyportfolioForm";
import { showFormContext } from "./contexts/showFormContext";

function WealthTracker() {
  const [showForm, setShowForm] = useState(false);

  return (
    <showFormContext.Provider value={{ showForm, setShowForm }}>
      <div className="relative">
        <Navbar />
        <main className="w-full">
          <HeroSection />
          <Section2 />
          <Section3 />
          <Section4 />
          <Accordion />
        </main>
        <Footer />
      </div>
      {showForm && <ReviewMyportfolioForm onClose={() => setShowForm(false)} />}
    </showFormContext.Provider>
  );
}

export default WealthTracker;
