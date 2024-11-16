"use client";
import React from "react";
import { AnimatedTooltip } from "./ui/animated-tooltip";
import { WavyBackground } from "./ui/wavy-background";

const people = [
  {
    id: 1,
    name: "Aqsa Chaudhary",
    designation: "Manager People Success (93% Skill Score)",
    image: "/asset/team1.jpg",
  },
  {
    id: 2,
    name: "Inam Dar",
    designation: "Assistant Manager HR (91% Skill Score)",
    image: "/asset/team2.jpg",
  },
  {
    id: 3,
    name: "Adeel Ahmed Khan",
    designation: "Executive Human Resources (92% Skill Score)",
    image: "/asset/team3.jpg",
  },
  {
    id: 4,
    name: "Alex Johnson",
    designation: "Lead Recruiter, Tech Enthusiast (92% Skill Score)",
    image: "/asset/team4.jpg",
  },
];

export function OurTeam() {
  return (
    <>

      <div className="flex relative overflow-hidden h-auto items-center justify-center py-10 md:py-16 lg:py-24 bg-black">

        <WavyBackground className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center h-full">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white font-bold inter-var text-center mb-5">
            Meet The Experienced HR&rsquo;s In Our Network
          </h1>
          <p className="text-base md:text-lg lg:text-xl mt-4 text-gray-300 font-normal inter-var text-center max-w-3xl mx-auto">
            Experts with years of industry experience and a proven track record
            of guiding candidates to success. From talent acquisition to career
            development, trust our network of seasoned professionals to elevate
            your interview experience and propel your career forward.
          </p>
          <div className="flex justify-center mt-8">
            <AnimatedTooltip items={people} />
          </div>
        </WavyBackground>
      </div>
    </>
  );
}
