"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

export function Testimonial() {
  return (
<>
    <div className="h-[40rem] rounded-md flex flex-col antialiased bg-black  bg-grid-white/[0.13] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
    </>
  );
}

const testimonials = [
  {
    quote:
      "Joining this platform was a game-changer for my job search. The feedback from real HR professionals was insightful and helped me land my current position. The tailored advice and personalized guidance made a significant difference in how I approached interviews and networking. Highly recommend it to anyone serious about their career and looking to take their job search to the next level.",
    name: "Fatima Q.",
    
  },
  {
    quote:
      "I was nervous about interviewing, but the mock sessions here made a world of difference. The HR professionals were supportive and provided actionable advice. I feel much more confident now! The detailed feedback helped me identify and work on my weaknesses, turning them into strengths. Thanks to this platform, I walked into my interviews with a clear strategy and a calm mindset.",
    name: "Ali R.",
    
  },
  {
    quote: "An invaluable resource for job seekers! The variety of HR professionals available for mock interviews allowed me to prepare for different industries and roles. Thanks to this platform, I aced my interviews. The real-world insights and tailored coaching gave me a competitive edge in my job search. I couldn’t have asked for a better way to build my confidence and sharpen my skills.",
    name: "Shafaq Areej",
    
  },
  {
    quote:
      "The personalized feedback and interview tips I received were exceptional. It's clear the HR professionals here really care about helping candidates succeed. I've recommended this platform to all my friends. The practical advice I gained not only improved my interview performance but also helped me refine my overall job search strategy. This platform is a must for anyone serious about advancing their career.",
    name: "Gullay Z.",
    
  },
  {
    quote:
      "The personalized feedback and interview tips I received were exceptional. It's clear the HR professionals here really care about helping candidates succeed. I've recommended this platform to all my friends. The practical advice I gained not only improved my interview performance but also helped me refine my overall job search strategy. This platform is a must for anyone serious about advancing their career.",
    name: "Asim M.",
    
  },
];
