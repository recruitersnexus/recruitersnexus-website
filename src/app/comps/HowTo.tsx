// components/prep.tsx
"use client";
import React from "react";
import { Meteors } from "./ui/meteors"; 

export function HowTo() {
  return (

    <div className="bg-black flex flex-col items-center justify-center min-h-screen">

      {/* Headings */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">
          How to Kickoff Your Interview Prep?
        </h1>
        <h2 className="text-xl font-semibold text-gray-300">
          Prepare for success with our intuitive platform. Start your journey to interview excellence today!
        </h2>
      </div>

      {/* Card */}
      <div className="w-full relative max-w-2xl"> 
        <div className="absolute flex inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
        <div className="relative shadow-xl mt-3 bg-gray-900 border border-gray-800 px-6 py-6 h-25 overflow-hidden rounded-3xl flex flex-col justify-end items-center">
          <div className="h-6 w-6 rounded-full border flex items-center justify-center  border-gray-500">
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
            </svg><span className=" text-gray-300">1</span>
          </div>

          <h1 className="font-bold text-xl text-white mb-4 relative z-50">
          Craft your profile
          </h1>

          <p className="font-normal text-base text-slate-500 mb-4 relative z-50">
          Sign Up and briefly showcase your skills and experience
          </p>

          {/* Meaty part - Meteor effect */}
          <Meteors number={20} />
        </div>
        <div className="relative shadow-xl mt-3 bg-gray-900 border border-gray-800 px-6 py-6 h-43 overflow-hidden rounded-3xl flex flex-col justify-end items-center">
          <div className="h-6 w-6 rounded-full border flex items-center justify-center  border-gray-500">
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
            </svg><span className=" text-gray-300">2</span>
          </div>

          <h1 className="font-bold text-xl text-white mb-4 relative z-50">
          Find your perfect match
          </h1>

          <p className="font-normal text-base text-slate-500 mb-4 relative z-50">
          Connect with HR professionals for mock interviews
          </p>

          {/* Meaty part - Meteor effect */}
          <Meteors number={20} />
        </div>
        <div className="relative shadow-xl mt-3  bg-gray-900 border border-gray-800 px-6 py-6 h-25 overflow-hidden rounded-3xl flex flex-col justify-end items-center">
          <div className="h-6 w-6 rounded-full border flex items-center justify-center  border-gray-500">
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
            </svg><span className=" text-gray-300">3</span>
          </div>

          <h1 className="font-bold text-xl text-white mb-4 relative z-50">
          Schedule & practice
          </h1>

          <p className="font-normal text-base text-slate-500 mb-4 relative z-50">
          Conduct interviews in a risk-free environment
          </p>

          {/* Meaty part - Meteor effect */}
          <Meteors number={20} />
        </div>
        <div className="relative shadow-xl mt-3 bg-gray-900 border border-gray-800 px-6 py-6 h-25 overflow-hidden rounded-3xl flex flex-col justify-end items-center">
          <div className="h-6 w-6 rounded-full border flex items-center justify-center  border-gray-500">
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
            </svg><span className=" text-gray-300">4</span>
          </div>

          <h1 className="font-bold text-xl text-white mb-4 relative z-50">
          Stand Out from the Competition
          </h1>

          <p className="font-normal text-base text-slate-500 mb-4 relative z-50">
          Receive valuable insights to refine your skills and land the job!
          </p>

          {/* Meaty part - Meteor effect */}
          <Meteors number={20} />
        </div>

        <div className="relative shadow-xl mt-3 bg-gray-900 border border-gray-800 px-6 py-6 h-25 overflow-hidden rounded-3xl flex flex-col justify-end items-center">
          <div className="h-6 w-6 rounded-full border flex items-center justify-center  border-gray-500">
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
            </svg><span className=" text-gray-300">5</span>
          </div>

          <h1 className="font-bold text-xl text-white mb-4 relative z-50">
          Earn Points and Increase Your Job Prospects
          </h1>

          <p className="font-normal text-base text-slate-500 mb-4 relative z-50">
          The more you practice with mock interviews, the more points you earn! Accumulate points to unlock advanced resources and improve your chances of securing your dream job.
          </p>

          {/* Meaty part - Meteor effect */}
          <Meteors number={20} />
        </div>
      </div>
    </div>
  );
}
