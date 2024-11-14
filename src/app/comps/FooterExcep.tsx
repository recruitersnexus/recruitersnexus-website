"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { GoClockFill } from "react-icons/go";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function FooterExcep() {
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
  // console.log("Parmas: ", params);

  return (
    <footer
      className={`text-white ${
        params === "/" ||
        params === "/about" ||
        params === "/jobs" ||
        params === "/contact"
          ? "hidden"
          : "block"
      }   bg-[#242E49] font-nunito`}
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
        <div className="container  px-5 py-12 lg:pb-6 lg:pt-6 flex flex-wrap  items-center">
          <div className="w-full flex flex-col md:flex-row justify-center items-center md:justify-around">
            <div className="flex space-x-6">
              <Link href="/terms" passHref>
                <div className="text-gray-300 hover:text-white cursor-pointer font-be text-[12px] lg:text-[16px] ">
                  Terms of Service
                </div>
              </Link>
              <Link href="/privacy" passHref>
                <div className="text-gray-300 hover:text-white cursor-pointer font-be text-[12px] lg:text-[16px] ">
                  Privacy Policy
                </div>
              </Link>
              {/* <Link href="/cookie-policy" passHref><div className="text-gray-300 hover:text-white cursor-pointer font-be text-[12px] lg:text-[16px] ">Cookie Policy</div></Link> */}
            </div>

            <div>
              <p className="text-gray-400 text-[16px] font-be mt-3 md:mt-0">
                © {currentYear} Recruiters Nexus. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
