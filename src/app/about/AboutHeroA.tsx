"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
<<<<<<< HEAD
=======
import Link from "next/link";
>>>>>>> baea275b85407d6cc494f7e68aba398acd25d353

export default function AboutHeroA() {
  const MULTIDIRECTION_SLIDE_VARIANTS = {
    hidden: { opacity: 0, x: "-25vw" },
    visible: { opacity: 1, x: 0 },
    right: { opacity: 0, x: "25vw" },
  };
  return (
<<<<<<< HEAD
    <div className="bg-black font-nunito bg-cover bg-no-repeat bg-center overflow-hidden">
=======
    <div className="font-nunito bg-cover bg-no-repeat bg-center overflow-hidden my-6">
>>>>>>> baea275b85407d6cc494f7e68aba398acd25d353
      {/* Custom gradient for mobile and medium screens, solid color for desktop */}
      <div className=" px-6 sm:px-10 md:px-24 pt-20 lg:py-12 flex flex-col  md:flex-col lg:flex-row w-full gap-4 md:gap-x-16 relative">
        <div className="flex justify-center w-full lg:mt-16 lg:w-1/2">
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
              src="/hero1.png"
              alt="hero"
              className="scale-100 sm:scale-110 md:scale-100 align-center lg:scale-100 w-auto h-auto"
            />
          </motion.h1>
        </div>

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
                Elevating career opportunities through user-centric interviews
                and efficient recruitment solutions.
              </span>
            </div>
            <div className="mt-4">
<<<<<<< HEAD
              <span className="font-be text-[14px] text-left text-white">
=======
              <span className="font-be text-[14px] text-left ">
>>>>>>> baea275b85407d6cc494f7e68aba398acd25d353
                At RecruitersNexus, we are committed to revolutionizing the
                recruitment process, making it more user-centric, efficient, and
                effective for both candidates and employers. We understand that
                traditional recruitment methods can be time-consuming,
                impersonal, and prone to bias, which is why we&apos;ve developed
                a suite of innovative solutions to address these challenges.We
                also prioritize the needs of employers, providing them with
                tools and resources to streamline their recruitment processes
                and identify top talent efficiently. Our efficient recruitment
                solutions leverage the latest technology, data analytics, and
                best practices to help employers make informed hiring decisions
                and build high-performing teams. By elevating career
                opportunities through our user-centric interviews and efficient
                recruitment solutions, we aim to create a win-win scenario for
                both candidates and employers. Our goal is to match the right
                talent with the right opportunities, driving success and growth
                for individuals, organizations, and the broader economy.
              </span>
            </div>

          </motion.h1>
        </div>
      </div>
    </div>
  );
}
