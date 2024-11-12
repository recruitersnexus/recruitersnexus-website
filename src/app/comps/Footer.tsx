"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };
  const MULTIDIRECTION_SLIDE_VARIANTS = {
    hidden: { opacity: 0, x: "-25vw" },
    visible: { opacity: 1, x: 0 },
    right: { opacity: 0, x: "25vw" },
  };

  const params = usePathname();

  return (
    <footer
      className={`text-white ${
        params === "/" ||
        params === "/about" ||
        params === "/jobs" ||
        params === "/contact"
          ? "block"
          : "hidden"
      } bg-black font-nunito`}
    >
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
        <div className="container mx-auto px-5 py-12  flex flex-wrap  items-center">
          <div className="w-full lg:w-1/2 px-4 mb-12 lg:mb-0">
            {/* <div className="w-full lg:w-1/3 px-4 mb-12 lg:mb-0"> */}
            <Link href="/" passHref>
              <motion.h1 variants={FADE_DOWN_ANIMATION_VARIANTS}>
                <div className="flex title-font font-medium items-center text-white cursor-pointer mb-4">
                  <Image
                    // src="/logo-uzair.png"
                    src="/RN-new-white.png"
                    height={250}
                    width={250}
                    alt="logo"
                    className="rounded"
                    // className="rounded-lg"
                    priority
                  />
                  {/* <span className="ml-3 text-[24px] leading-[32.74px] lg:text-[28px] lg:leading-[38.19px] font-nunito">
                    Recruiters Nexus
                  </span> */}
                </div>
              </motion.h1>
            </Link>
            <p className="mt-2 text-[12px] leading-[18px] lg:text-[16px] text-gray-500 font-be md:w-full w-[85%] mb-6">
              We believe in the power of play to foster creativity.
            </p>
            <div className="mt-4 space-y-4">
              <div className="flex items-center">
                <motion.h1 variants={FADE_DOWN_ANIMATION_VARIANTS}>
                  <Image src="/email.png" height={40} width={40} alt="mail" />
                </motion.h1>
                <motion.h1 variants={FADE_DOWN_ANIMATION_VARIANTS}>
                  {/* <span className="ml-2 font-nunito font-bold lg:text-[20px] lg:leading-[27.28px] text-[16px] leading-[21.82px]">
                    recruitersnexus@gmail.com
                  </span> */}
                  <a
                    href="mailto:recruitersnexus@gmail.com"
                    className="ml-2 font-nunito hover:text-blue-500 font-bold lg:text-[20px] lg:leading-[27.28px] text-[16px] leading-[21.82px]"
                  >
                    recruitersnexus@gmail.com
                  </a>
                </motion.h1>
              </div>
              <div className="flex items-center">
                <motion.h1 variants={FADE_DOWN_ANIMATION_VARIANTS}>
                  <Image src="/phone.png" height={40} width={40} alt="phone" />
                </motion.h1>
                <motion.h1 variants={FADE_DOWN_ANIMATION_VARIANTS}>
                  <span className="ml-2 font-nunito font-bold  lg:text-[20px] lg:leading-[27.28px] text-[16px] leading-[21.82px]">
                    +92 320 506 6277
                  </span>
                </motion.h1>
              </div>
             
              <div className="flex items-center">
                <motion.h1 variants={FADE_DOWN_ANIMATION_VARIANTS}>
                  <div className="w-10 h-10 mr-2">
                    <Image
                      src="/location.png"
                      height={40}
                      width={40}
                      alt="location"
                    />
                  </div>
                </motion.h1>
                <motion.h1 variants={FADE_DOWN_ANIMATION_VARIANTS}>
                  <span className="ml-2 font-nunito font-bold  lg:text-[20px] lg:leading-[27.28px] text-[16px] leading-[21.82px]">
                    Village Kanate, Distt. & Tehsil Mansehra, KPK, Pakistan.
                  </span>
                </motion.h1>
              </div>
            </div>
          </div>
          {/* Navigation Links */}
          <div className="w-full lg:w-1/2 px-4">
            {/* <div className="w-full lg:w-2/3 px-4"> */}
            <div className="flex flex-wrap justify-evenly">
              <div className="w-full sm:w-1/2 md:w-1/4 mb-8 md:mb-0 ">
                <div>
                  <motion.h2
                    variants={FADE_DOWN_ANIMATION_VARIANTS}
                    className="font-bold lg:text-[20px] lg:leading-[27.28px] text-white mb-8"
                  >
                    About Us
                    {/* <h2 className="font-bold lg:text-[20px] lg:leading-[27.28px] text-white mb-8">About Us</h2> */}
                  </motion.h2>
                </div>
                <nav className="list-none space-y-4">
                  <li>
                    <Link href="/about#vision" passHref>
                      <motion.h1 variants={FADE_DOWN_ANIMATION_VARIANTS}>
                        <div className="text-gray-300 hover:text-gray-200 cursor-pointer font-be">
                          Our Vision
                        </div>
                      </motion.h1>
                    </Link>
                  </li>
                  <li>
                    <Link href="/about#mission" passHref>
                      <motion.h1 variants={FADE_DOWN_ANIMATION_VARIANTS}>
                        <div className="text-gray-300 hover:text-gray-200 cursor-pointer font-be">
                          Our Mission
                        </div>
                      </motion.h1>
                    </Link>
                  </li>
                  <li>
                    <Link href="/#experts" passHref>
                      <motion.h1 variants={FADE_DOWN_ANIMATION_VARIANTS}>
                        <div className="text-gray-300 hover:text-gray-200 cursor-pointer font-be">
                          Professionals
                        </div>
                      </motion.h1>
                    </Link>
                  </li>
                  <li>
                    <Link href="/#why-us" passHref>
                      <motion.h1 variants={FADE_DOWN_ANIMATION_VARIANTS}>
                        <div className="text-gray-300 hover:text-gray-200 cursor-pointer font-be">
                          Why Us
                        </div>
                      </motion.h1>
                    </Link>
                  </li>
                </nav>
              </div>
              <div className="w-full sm:w-1/2 md:w-1/4 mb-8 sm:mb-0">
                <motion.h2
                  className="font-bold lg:text-[20px] lg:leading-[27.28px] text-white mb-8"
                  variants={FADE_DOWN_ANIMATION_VARIANTS}
                >
                  Policies
                  {/* <h2 className="font-bold text-md  lg:text-[20px] lg:leading-[27.28px] text-white mb-8">Contact Us</h2> */}
                </motion.h2>
                <nav className="list-none space-y-4">
                  <li>
                    <Link href="/privacy" passHref>
                      <motion.h1 variants={FADE_DOWN_ANIMATION_VARIANTS}>
                        <div className="text-gray-300 hover:text-gray-200 cursor-pointer font-be">
                          Privacy Policy
                        </div>
                      </motion.h1>
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" passHref>
                      <motion.h1 variants={FADE_DOWN_ANIMATION_VARIANTS}>
                        <div className="text-gray-300 hover:text-gray-200 cursor-pointer font-be">
                          Terms & Conditions
                        </div>
                      </motion.h1>
                    </Link>
                  </li>
                  <li>
                    <Link href="/return" passHref>
                      <motion.h1 variants={FADE_DOWN_ANIMATION_VARIANTS}>
                        <div className="text-gray-300 hover:text-gray-200 cursor-pointer font-be">
                          Return Policy
                        </div>
                      </motion.h1>
                    </Link>
                  </li>
                  <li>
                    <Link href="/refund" passHref>
                      <motion.h1 variants={FADE_DOWN_ANIMATION_VARIANTS}>
                        <div className="text-gray-300 hover:text-gray-200 cursor-pointer font-be">
                          Refund Policy
                        </div>
                      </motion.h1>
                    </Link>
                  </li>
                </nav>
              </div>
             
            </div>
          </div>

         
          <div className="w-full flex flex-col  md:flex-row  justify-between items-center pt-6">
            <p className="text-gray-400 text-[16px] font-be">
              © {currentYear} Recruiters Nexus. All rights reserved.
            </p>
            <motion.h1
              initial="right"
              animate="visible"
              variants={MULTIDIRECTION_SLIDE_VARIANTS}
              transition={{ duration: 1 }}
            >
              <div className="flex mt-4 lg:mt-0">
                <Link href="https://facebook.com" passHref>
                  <div className="cursor-pointer">
                    <Image
                      src="/facebook.png"
                      width={56}
                      height={56}
                      className="lg:w-[56px] lg:h-[56px] w-[36px] h-[36px]"
                      alt="Facebook"
                    />
                  </div>
                </Link>
                <Link href="https://twitter.com" passHref>
                  <div className="cursor-pointer ml-4">
                    <Image
                      src="/x.png"
                      width={56}
                      height={56}
                      className="lg:w-[56px] lg:h-[56px] w-[36px] h-[36px]"
                      alt="Twitter"
                    />
                  </div>
                </Link>
                <Link href="https://linkedin.com" passHref>
                  <div className="cursor-pointer ml-4">
                    <Image
                      src="/linkedin.png"
                      width={56}
                      height={56}
                      className="lg:w-[56px] lg:h-[56px] w-[36px] h-[36px]"
                      alt="LinkedIn"
                    />
                  </div>
                </Link>
              </div>
            </motion.h1>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
