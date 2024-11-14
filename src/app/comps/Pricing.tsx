"use client";
import React from "react";
import { BackgroundGradient } from "./ui/background-gradient";

export default function Pricing() {
  const plans = [
    {
      title: "Basic",
      price: "free",
      features: [
        "2 Mock Interviews",
        "Basic Interview Rating",
        "Behavioral Interview",
        "Random Interviewer Pool",
        "No Interview Report",
        "No One-On-One Coaching sessions",
        "No Personalized Interview Report with Improvement suggestions",
        "No Dedicated Industry Specific Interview Pool",
      ],
      buttonLabel: (
        <>
          What are you waiting for?<br />
          <strong>Get Started For FREE!</strong>
        </>
      ),
    },
    {
      title: "Pro",
      price: "$1",
      features: [
        "One Mock Interview",
        "Basic Interview Rating",
        "Behavioral & Technical Interview",
        "Access to wider Interviewer Pool",
        "Detailed Interview Report",
        "No One-On-One Coaching sessions",
        "No Personalized Interview Report with Improvement suggestions",
        "No Dedicated Industry Specific Interview Pool",
      ],
      buttonLabel: "Start Your Pro Membership Today!",
    },
    {
      title: "Premium",
      price: "$5",
      features: [
        "Pack of 3 Mock Interviews",
        "Basic Interview Rating",
        "Behavioral, Technical & Case Studies",
        "Dedicated Industry Specific Interview Pool",
        "Personalized Interview Report with Improvement suggestions",
        "One-On-One Coaching Sessions with Experts with tips and tricks about how to secure a good job",
      ],
      buttonLabel: "Experience the Best - Get Premium Now!",
    },
  ];

  return (
<<<<<<< HEAD
    <div className="bg-black">
      <h2 className="text-5xl font-bold text-center mb-10 text-white">Explore Our Pricing Plans</h2>
=======
    <div className="py-12">
      <h2 className="text-3xl font-bold text-center mb-10">Explore Our Pricing Plans</h2>
>>>>>>> baea275b85407d6cc494f7e68aba398acd25d353
      <div className="flex flex-wrap justify-center gap-6">
        {plans.map((plan, index) => (
          <BackgroundGradient
            key={index}
<<<<<<< HEAD
            className="rounded-[22px] p-6 sm:p-10 bg-zinc-900 dark:bg-zinc-900 shadow-lg max-w-xs flex flex-col"
          >
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-2 text-white">{plan.title}</h3>
              <p className="text-2xl font-bold text-indigo-600">{plan.price}</p>
            </div>
            <div className="flex-grow mb-6">
              <h4 className="text-lg font-semibold mb-4 text-white">Available Features</h4>
=======
            className="rounded-[22px] p-6 sm:p-10 bg-white dark:bg-zinc-900 shadow-lg max-w-xs flex flex-col"
          >
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
              <p className="text-2xl font-bold text-indigo-600">{plan.price}</p>
            </div>
            <div className="flex-grow mb-6">
              <h4 className="text-lg font-semibold mb-4">Available Features</h4>
>>>>>>> baea275b85407d6cc494f7e68aba398acd25d353
              <ul className="text-sm space-y-2">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className={`flex items-center space-x-2 ${feature.startsWith("No") ? "text-red-500" : "text-green-600"}`}
                  >
                    <span>{feature.startsWith("No") ? "✗" : "✓"}</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button className="w-full rounded-full py-2 text-white bg-indigo-600 hover:bg-indigo-700">
              {plan.buttonLabel}
            </button>
          </BackgroundGradient>
        ))}
      </div>
    </div>
  );
}
