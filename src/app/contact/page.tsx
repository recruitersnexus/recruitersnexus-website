"use client";
import React from "react";

import Contact from "./contact";
export default function page() {
  const MULTIDIRECTION_SLIDE_VARIANTS = {
    hidden: { opacity: 0, x: "-25vw" },
    visible: { opacity: 1, x: 0 },
    right: { opacity: 0, x: "25vw" },
  };
  return (
    <div>

      <Contact/>
   

    </div>
  );
}
