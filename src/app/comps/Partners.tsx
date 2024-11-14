"use client"
import Image from 'next/image';
import React from 'react';
import { motion } from "framer-motion";

export default function Partners() {
    const MULTIDIRECTION_SLIDE_VARIANTS = {
        hidden: { opacity: 0, x: "-25vw" },
        visible: { opacity: 1, x: 0 },
        right: { opacity: 0, x: "25vw" },
    };
    return (
<<<<<<< HEAD
        <div className='h-auto px-4 sm:px-8 md:px-12 lg:px-16 flex flex-col md:flex-row md:space-y-0 md:space-x-6 lg:space-x-12 w-full items-center font-nunito overflow-hidden'>
=======
        <div className='bg-[#DBEBFF] h-auto py-8 px-4 sm:px-8 md:px-12 lg:px-16 flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-6 lg:space-x-12 w-full items-center font-nunito overflow-hidden'>
>>>>>>> baea275b85407d6cc494f7e68aba398acd25d353
            <div className='text-center sm:text-left flex flex-col items-center md:items-start w-full lg:w-[35%] mx-auto lg:mx-0'>
            <motion.h1
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={MULTIDIRECTION_SLIDE_VARIANTS}
        transition={{ duration: 0.35 }}>
                    <div className='flex flex-col gap-y-4'>
                        <span className='border border-[#5D6A85] p-2 rounded-[10px] text-[16px] font-weight-400 w-48 text-center font-be'>Our Trusted Partners</span>

                        <span className='font-extrabold text-[32px] leading-[42.47px] md:text-[36px] md:leading-[48px] text-left lg:text-[42px] lg:leading-[55.75px]  text-[#242E49]'>We are recognized by some of the top platforms in the industry.</span>

                    </div>
                </motion.h1>
            </div>
            <div className='w-full md:w-[65%] flex justify-center lg:justify-end'>
            <motion.h1
        initial="right"
        whileInView="visible"
        viewport={{ once: true }}
    
        variants={MULTIDIRECTION_SLIDE_VARIANTS}
        transition={{ duration: 0.35 }}>
                <Image
                    height={1000} // Increased size for mobile and medium devices
                    width={900} // Increased size for mobile and medium devices
                    src="/partners.svg"
                    alt="partners"
                    className='object-cover md:object-scale-down lg:object-fill'
                ></Image>
                </motion.h1>
            </div>
        </div>
    )
}
