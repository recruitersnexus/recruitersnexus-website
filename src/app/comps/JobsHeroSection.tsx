import Image from "next/image";
import React from "react";
import jobs_hero_section from "/jobs_hero_section.jpg";

const JobsHeroSection = () => {
  return (
    <div>
      <div className="relative h-[278px] bg-[#242E49] w-full flex justify-center items-center">
        <div className="absolute w-full  h-full ">
          <Image
            src={jobs_hero_section}
            alt="Footer_background_img"
            layout="fill"
            objectFit="cover"
            quality={75}
            objectPosition="center"
          />
        </div>

        <div className="absolute w-full bg-[#242e4963] h-full "></div>
        <div className="text-white font-sans z-10 h-auto w-full">
          <div className="relative w-full h-auto flex justify-center items-center ">
            {/* <div className="absolute bg-[#242E49] w-32 h-32 z-0 top-[-30px] "></div> */}
            <div className="z-10 px-6 text-5xl font-heading font-bold flex flex-col justify-center items-center ">
              <span className="text-white font-nunito text-[57px] leading-[75.65px] font-bold">
                Jobs
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsHeroSection;
