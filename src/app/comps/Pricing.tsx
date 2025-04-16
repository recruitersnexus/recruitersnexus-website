"use client";
import React from "react";
import { BackgroundGradient } from "./ui/background-gradient";
import useUserData from "@/lib/db/userData";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Pricing() {
  const { userData, status } = useUserData();
  const router = useRouter();
  // State to store the exchange rate
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);

  // Fetch USD to PKR exchange rate
  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(
          "https://v6.exchangerate-api.com/v6/23322a8e6245695fa13995a8/latest/USD"
        );
        const data = await response.json();
        setExchangeRate(data.conversion_rates.PKR);
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
        setExchangeRate(null);
      }
    };

    fetchExchangeRate();
  }, []);
  const plans = [
    {
      title: "Basic",
      price: "free",
      priceUSD: 0, 
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
      priceUSD: 1, 
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
      priceUSD: 5, 
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
  
   // Function to handle button click
    // Handle click event
  const handleClick = async (plan: { title: string; priceUSD: number }) => {
    if (status === "404") {
      toast.error("No User Found! Please log in.");
      router.push("/login");
      return;
    }
    if (userData?.role === "admin" || userData?.role === "hr") {
      toast.error("Only regular users can make a purchase. Admins and HR are not allowed to buy this.");
      return;
    }
    if (userData?.plan && userData.plan !== "free") {
      toast.success(`User already purchased '${userData.plan}' Plan.`);
      return;
    }
    if (exchangeRate === null) {
      toast.error("Exchange rate not available. Try again later.");
      return;
    }

    // Convert USD price to PKR
    const pricePKR = plan.priceUSD * exchangeRate;

    toast.success(`You selected the ${plan.title} plan. Amount: PKR ${pricePKR.toFixed(2)}`);

    // Redirect to JazzCash Payment
    // router.push(`/payment?priceUSD=${pricePKR}&plan=${plan.title}`);
    router.push(`/payment?plan=${plan.title}&priceUSD=${plan.priceUSD}`);
  };
  return (
    <div className="bg-black">
      <h2 className="text-5xl font-bold text-center mb-10 text-white">Explore Our Pricing Plans</h2>
    
      <div className="flex flex-wrap justify-center gap-6">
        {plans.map((plan, index) => (
          <BackgroundGradient
            key={index}
            className="rounded-[22px] p-6 sm:p-10 bg-zinc-900 dark:bg-zinc-900 shadow-lg max-w-xs flex flex-col"
          >
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-2 text-white">{plan.title}</h3>
              <p className="text-2xl font-bold text-indigo-600">{plan.price}</p>
              <p className="text-2xl font-bold text-indigo-600">{exchangeRate
                  ? `PKR ${(plan.priceUSD * exchangeRate).toFixed(2)}`
                  : "Fetching..."}</p>
            </div>
            <div className="flex-grow mb-6">
              <h4 className="text-lg font-semibold mb-4 text-center text-white">Available Features</h4>
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
            <button 
            onClick={() => handleClick(plan)}
            className="w-full rounded-full py-2 text-white bg-indigo-600 hover:bg-indigo-700">
              {plan.buttonLabel}
            </button>
          </BackgroundGradient>
        ))}
      </div>
    </div>
  );
}
