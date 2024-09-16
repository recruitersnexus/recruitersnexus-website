"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutHeroB() {
  const MULTIDIRECTION_SLIDE_VARIANTS = {
    hidden: { opacity: 0, x: "-25vw" },
    visible: { opacity: 1, x: 0 },
    right: { opacity: 0, x: "25vw" },
  };
  return (
    <div className="font-nunito bg-cover bg-no-repeat bg-center overflow-hidden">
      {/* Custom gradient for mobile and medium screens, solid color for desktop */}
      <div className=" px-6 sm:px-10 md:px-24 pt-20 lg:py-12 flex flex-col-reverse  md:flex-col lg:flex-row w-full gap-4 md:gap-x-16 relative">
        {/* <div className='flex flex-col gap-y-4 mt-8 md:mt-14 lg:mt-16 z-[2] w-full lg:w-1/2'> */}
        <div className="flex z-[2] w-full lg:w-1/2">
          <motion.h1
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={MULTIDIRECTION_SLIDE_VARIANTS}
            transition={{ duration: 0.35 }}
            className="flex flex-col justify-center"
          >
            
            <div className="flex flex-wrap items-center">
              <span className="z-[2] font-bold text-[22px] sm:text-[25px] md:text-[32px] lg:text-[40px] text-[#242E49] leading-[20px] text-left sm:leading-[25px] md:leading-[35px] lg:leading-[42px]">
                Dreaming of interviews that empower individuals to showcase
                their potential, shaping a brighter future.
              </span>
            </div>
            <div className="mt-4">
              <span className="font-be text-[14px] text-left">
                At RecruitersNexus, we envision a world where interviews
                transcend the traditional question-answer format, becoming
                transformative experiences that empower individuals to shine. We
                believe that every person has unique talents and potential
                waiting to be discovered, and our mission is to provide a
                platform where these qualities can be showcased and celebrated.
                Through our innovative interview process, individuals are given
                the opportunity to not only demonstrate their skills and
                expertise but also to express their passions, aspirations, and
                values. We understand that the traditional interview setting can
                be intimidating and may not accurately reflect a person&apos;s
                true capabilities. That&apos;s why we strive to create an
                environment that fosters authenticity, confidence, and
                meaningful connections. By reimagining the interview experience
                as a platform for personal and professional growth, we aim to
                unlock opportunities, break down barriers, and pave the way for
                a more equitable and prosperous future for all.
              </span>
            </div>
            
          </motion.h1>
        </div>
        <div className="flex justify-center w-full lg:mt-16 lg:w-1/2 mb-6 sm:mb-0">
          <motion.h1
            initial="right"
            whileInView="visible"
            viewport={{ once: true }}
            variants={MULTIDIRECTION_SLIDE_VARIANTS}
            transition={{ duration: 0.35 }}
            className=" flex justify-center align-center items-center"
          >
            <Image
              height={900}
              width={687}
              src="/hero2.png"
              alt="hero"
              className="scale-100 sm:scale-110 md:scale-100 align-center lg:scale-100 w-auto h-auto"
            />
          </motion.h1>
        </div>
      </div>
    </div>
  );
}
