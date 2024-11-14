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
<<<<<<< HEAD
  return <HeroParallax products={product}/>;
=======
  return <HeroParallax products={product} />;
>>>>>>> baea275b85407d6cc494f7e68aba398acd25d353
}

export default HeroParallaxDemo;
