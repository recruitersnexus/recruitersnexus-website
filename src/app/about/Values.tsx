"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { Meteors } from "../comps/ui/meteors";
export default function Values() {
  const cardContent = [
    {
      title: "Empowering Individuals and Organizations",
      description: "We empower individuals and organizations, providing the tools and support needed for success and growth.",
    },
    {
      title: "Fostering Diversity and Inclusion",
      description: "We are committed to fostering diversity and inclusion, creating a welcoming environment where everyone can thrive.",
    },
    {
      title: "Transparency and Trust",
      description: "We prioritize transparency and trust, fostering open communication and integrity in all our interactions.",
    },
    {
      title: "Building Partnerships for Success",
      description: "We believe in the power of collaboration, forging partnerships that drive mutual success and innovation.",
    },
    {
      title: "Striving for Excellence",
      description: "We are dedicated to continuous improvement, constantly seeking ways to enhance our platform and services to better serve our users.",
    },
    {
      title: "Ownership and Responsibility",
      description: "We uphold accountability, taking ownership of our actions and decisions to build trust and credibility with our users.",
     
    },
  ];
  const MULTIDIRECTION_SLIDE_VARIANTS = {
    hidden: { opacity: 0, x: "-25vw" },
    visible: { opacity: 1, x: 0 },
    right: { opacity: 0, x: "25vw" },
  };
  return (
  <>  <div className="text-center  font-bold text-[48px]"><h1>Our Core Values</h1></div>
  <div className="flex justify-center items-center min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6">
        {cardContent.map((card, index) => (
          <div key={index} className="w-full relative max-w-sm">
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
            <div className="relative shadow-xl bg-gray-900 border border-gray-800 px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
              <div className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 border-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-2 w-2 text-gray-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
                  />
                </svg>
              </div>

              <h1 className="font-bold text-xl text-white mb-4 relative z-50">
                {card.title}
              </h1>

              <p className="font-normal text-base text-slate-500 mb-4 relative z-50">
                {card.description}
              </p>

              <Meteors number={20} />
            </div>
          </div>
        ))}
      </div>
    </div></>
  );
}
