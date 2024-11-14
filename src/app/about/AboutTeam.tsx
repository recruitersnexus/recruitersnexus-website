"use client"
/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image';
import React from 'react';
import { motion } from "framer-motion";

// Example team members array
const teamMembers = [
  {
    id: 1,
    name: "Daniel Asmus",
    imageSrc: "/team1.jpg",
    description: "Professional HR, CYBA Member",
    skillScore: "90% Skill Score",
  },
  {
    id: 2,
    name: "Alex Johnson",
    imageSrc: "/team2.jpg",
    description: "Lead Recruiter, Tech Enthusiast",
    skillScore: "92% Skill Score",
  },
  {
    id: 3,
    name: "Alex Johnson",
    imageSrc: "/team3.jpg",
    description: "Lead Recruiter, Tech Enthusiast",
    skillScore: "92% Skill Score",
  },
  {
    id: 4,
    name: "Alex Johnson",
    imageSrc: "/team4.jpg",
    description: "Lead Recruiter, Tech Enthusiast",
    skillScore: "92% Skill Score",
  },
  {
    id: 5,
    name: "Alex Johnson",
    imageSrc: "/team5.jpg",
    description: "Lead Recruiter, Tech Enthusiast",
    skillScore: "92% Skill Score",
  },
  {
    id: 6,
    name: "Alex Johnson",
    imageSrc: "/team6.jpg",
    description: "Lead Recruiter, Tech Enthusiast",
    skillScore: "92% Skill Score",
  },
  {
    id: 7,
    name: "Alex Johnson",
    imageSrc: "/team7.jpg",
    description: "Lead Recruiter, Tech Enthusiast",
    skillScore: "92% Skill Score",
  },
  {
    id: 8,
    name: "Alex Johnson",
    imageSrc: "/team8.jpg",
    description: "Lead Recruiter, Tech Enthusiast",
    skillScore: "92% Skill Score",
  },
];
const FADE_DOWN_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0, transition: { type: "spring" } },
};

export default function AboutTeam() {
  return (
    <>
      <div className='px-4 sm:px-8 md:px-24 mb-12'>
      <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.05,
          },
        },
      }}
    >
      <motion.h1 variants={FADE_DOWN_ANIMATION_VARIANTS}>
        <div className='mt-12 md:mt-24 flex flex-col gap-y-4 justify-center items-center mx-4 font-nunito'>
          
              <span className='border border-[#5D6A85] p-2 rounded-[10px] text-[16px] leading-[24px] font-weight-400 w-24 text-center  text-[#333333] font-be '>Our Team</span>
            
              <span className='font-extrabold text-[32px] leading-[42.47px] lg:text-[42px] lg:leading-[55.75px] text-center text-[#242E49] font-nunito '>Meet The Experienced HR's In Our Network</span>
            
              <span className='text-center text-[#333333] mb-8 lg:text-[16px] text-[14px] lg:leading:[24px] leading:[18px] lg:mx-24 font-be'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sapien nulla, commodo ac odio a, pulvinar lobortis turpis. Praesent tempus tristique ullamcorper. Vestibulum eu felis eu erat suscipit interdum non in metus.
              </span>
        </div>
        </motion.h1>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {teamMembers.map(member => (
            <div key={member.id} className="flex flex-col items-center p-4 ">
              <div className=" mb-4 rounded-[24px] overflow-hidden relative">
                <Image src={member.imageSrc} className='fill object-cover lg:w-[236px] lg:h-[232px] xl:w-[286px] xl:h-[282px] w-[185px] h-[182.41px]' width={286} height={282} alt='team-member'  />
              </div>
              <h2 className="lg:text-[24px] text-[18px] leading-[32px] font-bold text-[#242E49]">{member.name}</h2>
              <p className="text-[12px] lg:text-[16px] text-center text-[#333333] leading-[18.75px] lg:leading-[32px] font-be">{member.description}</p>
              <p className="text-[12px] lg:text-[16px] text-center text-[#333333] leading-[18.75px] lg:leading-[18.75px] font-be">{member.skillScore}</p>
              <button className="mt-4 px-4 py-2 border border-[#4765FF] text-[#4765FF] hover:bg-[#4765FF] hover:text-white rounded-md">Book a Call</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
