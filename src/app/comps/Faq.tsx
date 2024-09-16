
"use client";
import Image from "next/image";
import React from "react";

export default function Faq() {
  return (
    <div className="py-12 lg:py-16 flex flex-col md:flex-row w-full px-8 md:px-8 lg:px-24">
      <div className="md:w-[40%] flex flex-col items-start text-left">
        <span className="font-extrabold text-[32px] leading-[42.47px] lg:text-[42px] lg:leading-[55.75px]  font-nunito">
          Frequently Asked Questions
        </span>
        <span className="text-[14px] leading-[23.65px] lg:text-[20px] lg:leading-[33.8px] w-[75%] text-gray-700 font-be">
        Maximize your experience! Check out our FAQ section for quick resolutions and handy tips.
        </span>
       
        {/* Image for mobile view */}
        <div className="md:hidden w-full mt-5">
          <Image src="/faq.png" alt="FAQ" width={500} height={800} />
        </div>
        {/* Image for tablet and desktop view */}
        <div className="hidden md:block md:w-full lg:w-3/4 xl:w-full">
          <Image src="/faq.png" alt="FAQ" width={500} height={800} />
        </div>
      </div>

      <div className="md:w-[60%] mt-10 md:mt-0">
        <div className="space-y-4">
          {/* FAQ 1 */}
          <div
            className="group flex flex-col gap-2 border border-blue-200 rounded-[12px] p-5 text-gray-800"
            tabIndex={0}
          >
            <div className="flex cursor-pointer items-center justify-between">
              <span className=" lg:text-[24px] lg:leading-[32px] text-[16px] leading-[25px] font-bold text-[#242E49] font-nunito">
                Why should I participate in mock interviews with real HR
                professionals?
              </span>
              <Image
                src={"/plus.png"}
                alt="plus"
                width={50}
                height={50}
                className="transition-transform duration-500 group-focus:rotate-45"
              />
            </div>
            <div className="max-h-0 overflow-hidden transition-all duration-500 group-focus:max-h-screen">
              <div className="relative flex py-5 pr-6 pl-2 items-center">
                <div className="flex-grow border-t border-[#DBEBFF]" />
              </div>
              <p className="pt-4 text-gray-700 lg:text-[16px] lg:leading-[25.6px] text-[12px] leading-[19.2px] font-nunito w-[80%] text-start">
                Participating in mock interviews with real HR professionals
                offers you a unique opportunity to experience the interview
                process in a risk-free environment. You'll receive direct
                feedback on your interview skills, understand what HR looks for
                in candidates, and significantly improve your confidence and
                performance in real interviews.
              </p>
            </div>
          </div>

          {/* FAQ 2 */}
          <div
            className="group flex flex-col gap-2 border border-blue-200 rounded-[12px] p-5 text-gray-800"
            tabIndex={1}
          >
            <div className="flex cursor-pointer items-center justify-between">
              <span className=" lg:text-[24px] lg:leading-[32px] text-[16px] leading-[25px] font-bold text-[#242E49] font-nunito">
                How can this project help me prepare for actual job interviews?
              </span>
              <Image
                src={"/plus.png"}
                alt="plus"
                width={50}
                height={50}
                className="transition-transform duration-500 group-focus:rotate-45"
              />
            </div>
            <div className="max-h-0 overflow-hidden transition-all duration-500 group-focus:max-h-screen">
              <div className="relative flex py-5 pr-6 pl-2 items-center">
                <div className="flex-grow border-t border-[#DBEBFF]" />
              </div>
              <p className="pt-4 text-gray-700 lg:text-[16px] lg:leading-[25.6px] text-[12px] leading-[19.2px] font-nunito">
                This project simulates real interview scenarios, providing you
                with insights into common questions, interview formats, and
                expectations from HR professionals. You'll learn how to
                articulate your thoughts, showcase your skills effectively, and
                handle challenging questions, preparing you for success in
                actual job interviews.
              </p>
            </div>
          </div>

          <div
            className="group flex flex-col gap-2 border border-blue-200 rounded-[12px] p-5 text-gray-800"
            tabIndex={2}
          >
            <div className="flex cursor-pointer items-center justify-between">
              <span className=" lg:text-[24px] lg:leading-[32px] text-[16px] leading-[25px] font-bold text-[#242E49] font-nunito">
                What makes your mock interview platform different from others?
              </span>
              <Image
                src={"/plus.png"}
                alt="plus"
                width={50}
                height={50}
                className="transition-transform duration-500 group-focus:rotate-45"
              />
            </div>
            <div className="max-h-0 overflow-hidden transition-all duration-500 group-focus:max-h-screen">
              <div className="relative flex py-5 pr-6 pl-2 items-center">
                <div className="flex-grow border-t border-[#DBEBFF]" />
              </div>
              <p className="pt-4 text-gray-700 lg:text-[16px] lg:leading-[25.6px] text-[12px] leading-[19.2px] font-nunito">
                Our platform stands out because it connects you with experienced
                HR professionals from various industries, offering personalized
                feedback based on real-world hiring practices. Additionally, we
                provide resources and tools to further enhance your interview
                skills beyond the mock interview sessions.
              </p>
            </div>
          </div>

          <div
            className="group flex flex-col gap-2 border border-blue-200 rounded-[12px] p-5 text-gray-800"
            tabIndex={3}
          >
            <div className="flex cursor-pointer items-center justify-between">
              <span className=" lg:text-[24px] lg:leading-[32px] text-[16px] leading-[25px] font-bold text-[#242E49] font-nunito">
                How can participating as an interviewer help me improve my HR
                recruiter skills?
              </span>
              <Image
                src={"/plus.png"}
                alt="plus"
                width={50}
                height={50}
                className="transition-transform duration-500 group-focus:rotate-45"
              />
            </div>
            <div className="max-h-0 overflow-hidden transition-all duration-500 group-focus:max-h-screen">
              <div className="relative flex py-5 pr-6 pl-2 items-center">
                <div className="flex-grow border-t border-[#DBEBFF]" />
              </div>
              <p className="pt-4 text-gray-700 lg:text-[16px] lg:leading-[25.6px] text-[12px] leading-[19.2px] font-nunito">
                Participating as an interviewer allows you to refine your
                interviewing and assessment skills by engaging with a diverse
                pool of candidates. It offers you the chance to practice
                different interview techniques, stay updated on the latest
                trends in recruitment, and better understand the candidate's
                perspective, enhancing your overall effectiveness as a
                recruiter.
              </p>
            </div>
          </div>

          <div
            className="group flex flex-col gap-2 border border-blue-200 rounded-[12px] p-5 text-gray-800"
            tabIndex={4}
          >
            <div className="flex cursor-pointer items-center justify-between">
              <span className=" lg:text-[24px] lg:leading-[32px] text-[16px] leading-[25px] font-bold text-[#242E49] font-nunito">
                Why should I join this project as an HR professional?
              </span>
              <Image
                src={"/plus.png"}
                alt="plus"
                width={50}
                height={50}
                className="transition-transform duration-500 group-focus:rotate-45"
              />
            </div>
            <div className="max-h-0 overflow-hidden transition-all duration-500 group-focus:max-h-screen">
              <div className="relative flex py-5 pr-6 pl-2 items-center">
                <div className="flex-grow border-t border-[#DBEBFF]" />
              </div>
              <p className="pt-4 text-gray-700 lg:text-[16px] lg:leading-[25.6px] text-[12px] leading-[19.2px] font-nunito">
                Joining this project as an HR professional provides you with a
                platform to share your knowledge, mentor job seekers, and
                contribute to their career development. It's an opportunity to
                give back to the community while honing your own skills and
                expanding your network with other HR professionals.
              </p>
            </div>
          </div>

          <div
            className="group flex flex-col gap-2 border border-blue-200 rounded-[12px] p-5 text-gray-800"
            tabIndex={4}
          >
            <div className="flex cursor-pointer items-center justify-between">
              <span className=" lg:text-[24px] lg:leading-[32px] text-[16px] leading-[25px] font-bold text-[#242E49] font-nunito">
                Can participating in this project help me with my own
                recruitment processes?
              </span>
              <Image
                src={"/plus.png"}
                alt="plus"
                width={50}
                height={50}
                className="transition-transform duration-500 group-focus:rotate-45"
              />
            </div>
            <div className="max-h-0 overflow-hidden transition-all duration-500 group-focus:max-h-screen">
              <div className="relative flex py-5 pr-6 pl-2 items-center">
                <div className="flex-grow border-t border-[#DBEBFF]" />
              </div>
              <p className="pt-4 text-gray-700 lg:text-[16px] lg:leading-[25.6px] text-[12px] leading-[19.2px] font-nunito">
                Absolutely. By engaging with candidates from various backgrounds
                and industries, you'll gain deeper insights into effective
                questioning techniques, candidate evaluation, and the
                intricacies of the interview process. These experiences can
                directly translate to more effective and efficient recruitment
                processes in your own work.
              </p>
            </div>
          </div>

          {/* Additional FAQs */}
          {/* Similar structure to the above FAQs can be repeated for other questions */}
        </div>
      </div>
    </div>
  );
}
