"use client"
import { HoverEffect } from "../comps/ui/card-hover-effect";

export function WhyUs() {
  return (
    <div className="bg-black max-w-8xl mx-auto px-8">
    
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    title: "Effortless Interview Scheduling",
    description:
      "Ditch the back-and-forth emails! Our platform automates scheduling, saving you time for meaningful interviews. Focus on finding the perfect fit, not logistics.",
  },
  {
    title: "Informed Decisions, Made Easy",
    description:
      "Gain valuable insights beyond resumes. Two-way interview ratings help you identify strong candidates and refine your hiring process for better results.",

  },
  {
    title: "Gateway to a World of Opportunities",
    description:
      "Discover diverse employment opportunities spanning multiple sectors, effortlessly connecting with prospective employers across various industries on our platform.",
    
  },
  {
    title: "Data-Driven Hiring Decisions",
    description:
      "Leverage interview ratings for a deeper understanding of your candidate pool. Make informed choices with data-driven insights that refine your hiring strategy.",
    
  },

];
