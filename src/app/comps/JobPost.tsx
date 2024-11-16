"use client"
import React from 'react'
import { motion } from "framer-motion";
import JobData from '@/lib/db/jobData';
import MainUsers from '@/lib/db/mainUsers';
import SkeletonLoaderCustom from '@/components/SkeletonLoaderCustom';
import JobSkillsData from '@/lib/db/jobSkillsData';
// import jobSkillsData from '@/lib/db/jobSkillsData';
import Link from 'next/link';


export default function JobPostsGrid() {
  const { users } = MainUsers();
  const { jobSkill } = JobSkillsData();
  const { jobs } = JobData();
  const filteredJobs = jobs.filter((job: any) => job.is_approved === "approved");
  const currentTime = new Date();
  const adminJobs = filteredJobs.filter((job: any) => {
    // Find the corresponding admin user
    const adminUser = users.find((user: any) => user.role === "admin" && user.id === job.user_id);
    // Return true if an admin user with matching user ID is found
    return adminUser !== undefined;
  });
  //console.log("Admin Jobs: ", adminJobs);

  const hrJobs = filteredJobs.filter((job: any) => {
    // Find the corresponding HR user
    const hrUser = users.find((user: any) => user.role === "hr" && user.id === job.user_id);
    // Return true if an HR user with matching user ID is found
    return hrUser !== undefined;
  });

  //console.log("Hr Jobs: ", hrJobs);


  function getTimeDifferenceInWords(timestamp: string, currentTime: Date): string {
    const jobPostingTime = new Date(timestamp);
    const currentTimeUTC = currentTime.getTime();
    const jobPostingTimeUTC = jobPostingTime.getTime();
    const timeDifferenceInMilliseconds = currentTimeUTC - jobPostingTimeUTC;
    const timeDifferenceInMinutes = Math.floor(timeDifferenceInMilliseconds / (1000 * 60));
    const timeDifferenceInHours = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60));
    const timeDifferenceInDays = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24));

    if (timeDifferenceInDays >= 1) {
      return `${timeDifferenceInDays} day${timeDifferenceInDays !== 1 ? 's' : ''} ago`;
    } else if (timeDifferenceInHours >= 1) {
      return `${timeDifferenceInHours} hour${timeDifferenceInHours !== 1 ? 's' : ''} ago`;
    } else {
      return `${timeDifferenceInMinutes} minute${timeDifferenceInMinutes !== 1 ? 's' : ''} ago`;
    }
  }



  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };
  return (
    <motion.div
      initial="hidden"
      animate="show"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.95,
          },
        },
      }}
    >
      <motion.h1 variants={FADE_DOWN_ANIMATION_VARIANTS}>
        {filteredJobs && filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 py-12 px-4 lg:px-24">
            {filteredJobs?.map((job: any) => (
              <div key={job.id} className="lg:w-[75%] w-[80%] mx-auto bg-white rounded-xl shadow-sm outline-1 outline outline-[#242E49]/15 hover:shadow-md overflow-hidden ">
                <div className="p-8">
                  <div className='flex justify-between items-center mb-3'>
                    <div className='flex flex-col'>
                      <p className="mt-2 text-gray-500 text-sm">Posted {getTimeDifferenceInWords(job?.created_at, currentTime)}</p>
                      <p className="block mt-1 text-xl leading-tight font-nunito font-bold text-[#242E49]">{job?.title}</p>
                    </div>
                    {/* <div className='flex space-x-3 text-[#242E49]'>
                      <Image src="/heart.svg" width={24} height={24} alt="like" className=''/>
                      <Image src="/thumbsDown.svg" width={24} height={24} alt="reject" />
                    </div> */}
                  </div>
                  <div className="tracking-wide text-sm text-gray-500 mb-3">Expected Salary: {job.salary_start}$-{job.expiration_date}$</div>
                  <p className="mt-1 text-gray-900 text-justify ">{job?.description}</p>
                  <div className="mt-3 flex flex-wrap overflow-x-hidden">
                  {jobSkill
                    .filter((skill: any) => (skill.user_id === job?.id))
                    .map((item: any) => (
                      <div key={item.user_id} >
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 text-center">{item?.skill}</span>

                      </div>
                    ))
                  }
                  
                  
                  
                  </div>

                  <div className='mt-3 bg-[#242E49] w-32 text-center py-2 rounded-lg text-[#F2F5F9] hover:bg-[#242E49]/95 hover:text-white'>
                    <Link href={`/schedule_interview/${job.user_id}`}>Apply for Job</Link>
                  </div>


                  {/* <div className='flex items-start space-x-4 text-sm text-gray-500 mt-3'>
                    <span >Proposals: 10 to 15</span>
                    <span>Connects to apply: 4 Connects</span>
                  </div> */}
                </div>
              </div>
            ))}
          </div>
        ) : filteredJobs && filteredJobs?.length === 0 ? (
          <div>
            <h1 className='w-full h-screen flex justify-center items-center text-[#242E49] font-nunito font-bold text-3xl'>NO JOBS AVAILABLE</h1>
          </div>
        ) : (<SkeletonLoaderCustom />)}

      </motion.h1>
    </motion.div>
  );
}
