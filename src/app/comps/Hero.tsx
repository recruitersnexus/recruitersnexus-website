// components/herosection.tsx
"use client";
import React from "react";
import { HeroParallax } from "../comps/ui/hero-parallax";
export const product = [
  {
    thumbnail: "/asset/hero.jpg",
  },
  
  {
    thumbnail: "/asset/hero2.png",
  },
  {
    thumbnail: "/asset/hero123.png",
  },
  {
    thumbnail: "/asset/hero1.png",
  },
  {
    thumbnail: "/asset/hero5.jpg",
  },

];

export function HeroParallaxDemo() {
  return <HeroParallax products={product} />;
}

export default HeroParallaxDemo;
