


import React from "react";
import AboutHeroA from "./AboutHeroA";
import AboutHeroB from "./AboutHeroB";
import Values from "./Values";

export default function page() {
  return (
    <div>
     
      
      <div id="mission">
        <AboutHeroA />
      </div>
      <div id="vision">
        <AboutHeroB />
      </div>
      <Values />
    
    </div>
  );
}
