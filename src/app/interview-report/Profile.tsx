"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import InterviewData from "@/lib/db/interviewData";
import MainUsers from "@/lib/db/mainUsers";
import HrData from "@/lib/db/hrData";
import { useRouter } from "next/navigation";
import FeedbackData from "@/lib/db/feedbackData";
import format from "date-fns/format";
import useUserData from "@/lib/db/userData";
import { useEffect } from "react";
import toast from "react-hot-toast";
import SkeletonLoaderCustom from "@/components/SkeletonLoaderCustom";

export default function InterviewProfile({ user_id }: { user_id: string }) {
  const { interviews } = InterviewData();
  const filteredInterview = interviews.filter(
    (interview) => interview.id.toString() === user_id
  );
  const { users } = MainUsers();
  const { hrTable } = HrData();
  const router = useRouter();
  const { feedback } = FeedbackData();
  const { userData, status } = useUserData();

  const formatDateTime = (dateTimeString: any) => {
    const optionsDate: any = { year: "numeric", month: "long", day: "numeric" };
    const optionsTime: any = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    };

    const date = new Date(dateTimeString);
    const formattedDate = format(date, "dd-MMMM-yyyy", optionsDate);
    const formattedTime = format(date, "HH:mm:ss zzz", optionsTime);

    return {
      date: formattedDate,
      time: formattedTime,
    };
  };

  useEffect(() => {
    // Check if there is no user data (e.g., user logged out)
    if (status === "404") {
        //console.log("No user data found.");
        //console.log("Status: " + status);
        // alert("No User Found!");
        toast.error("No User Found!");
        //console.log("NO user Found!");
        router.push("/login");
    }

    if (userData && userData?.role !== "user") {
      // alert("No User Found!");
      toast.error("Not Allowed!");
      router.push("/dashboards");
    }
  }, [userData, status, router]);

  return (
    <div className=" bg-blue-50 px-[15px] py-[14px] md:px-[40px] md:py-[20px] flex justify-center items-center ">
      {userData && userData?.role === "user" ? (
        <div className="w-full lg:max-w-6xl">
          <span className="font-nunito flex justify-center text-[24px] leading[30px] md:text-[30px] md:leading[39px] font-bold text-[#242E49]">
            Detailed Interview Report
          </span>


        {filteredInterview?.map((interview) => (
          <div key={interview?.id}>
            <div className="bg-white font-be text-[#333333] rounded-[8px] grid grid-cols-1  place-items-center gap-y-3  py-3 px-3 sm:py-4 sm:px-6 my-4">
              <Image
                className="rounded"
                // className='rounded-lg'
                height={120}
                width={120}
                src="/RN-new-black.png"
                // src="/logo-uzair.png"
                alt="logo"
                priority
              ></Image>
            </div>
            <span className="font-nunito text-[24px] leading[30px] md:text-[30px] md:leading[39px] font-bold text-[#242E49]">
              Participants{" "}
            </span>
            <div className="bg-white rounded-[16px] mt-4 text-center flex flex-col lg:flex-row mb-[30px]">

              {users?.filter((user: any) => user.id === interview?.hr_id).map((userImage: any) => (
                <div key={userImage.id} className="lg:w-[50%] py-6 sm:py-8 px-3 sm:px-6px md:px-12 border-r-[1px] flex flex-col items-center justify-center">
                  <Image
                    src={userImage?.image || "/dashProfile.png"}
                    width={126}
                    height={126}
                    alt="profile picture"
                    className="rounded-full"
                  />

                  {hrTable?.filter((hr: any) => hr.user_id === interview?.hr_id).map((info: any) => (
                    <div key={info?.id} className="flex flex-col items-center justify-center">
                      <span className="font-nunito leading-[37px] text-[28px] font-bold text-[#242E49] my-2">
                        {info?.fname} {info?.lname}
                      </span>
                      <span className="font-be leading-[27px] text-[18px] text-[#6D6D6D]">
                        HR
                      </span>
                    </div>
                  ))}

                      <button
                        onClick={() =>
                          router.push(`/profile?id=${interview?.hr_id}`)
                        }
                        className="mt-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-[10px] shadow-md hover:bg-blue-700 transition-colors"
                      >
                        View Profile
                      </button>
                    </div>
                  ))}



              {users?.filter((user: any) => user.id === interview?.user_id).map((userImage: any) => (
                <div key={userImage.id} className="lg:w-[50%] py-6 sm:py-8 px-3 sm:px-6px md:px-12 border-r-[1px] border-t-[1px] lg:border-t-0 flex flex-col items-center justify-center">
                  <Image
                    src={userImage?.image || "/dashProfile.png"}
                    width={126}
                    height={126}
                    alt="profile picture"
                    className="rounded-full"
                  />


                  {hrTable?.filter((hr: any) => hr.user_id === interview?.user_id).map((info: any) => (
                    <div key={info?.id} className="flex flex-col items-center justify-center">
                      <span className="font-nunito leading-[37px] text-[28px] font-bold text-[#242E49] my-2">
                        {info?.fname} {info?.lname}
                      </span>
                      <span className="font-be leading-[27px] text-[18px] text-[#6D6D6D]">
                        Interviewee
                      </span>
                    </div>
                  ))}

                      <button
                        onClick={() =>
                          router.push(`/profile?id=${interview?.user_id}`)
                        }
                        className="mt-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-[10px] shadow-md hover:bg-blue-700 transition-colors"
                      >
                        View Profile
                      </button>
                    </div>
                  ))}
              </div>

              <span className="font-nunito text-[24px] leading[30px] md:text-[30px] md:leading[39px] font-bold text-[#242E49]">
                Reports Details
              </span>



            {hrTable?.filter((hr: any) => hr.user_id === interview?.user_id).map((info: any) => (

              <div key={info?.id} className="bg-white font-be text-[#333333] rounded-[8px]  gap-y-3  py-3 px-3 sm:py-4 sm:px-6 my-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 place-items-start ">
                  <div className="  px-2 gap-y-2 justify-start text-left">
                    <span className="text-[14px] leading-[20px] ">
                      Interviewee First Name:
                    </span>
                    <span className=" ml-2 text-[14px] leading-[20px] font-nunito font-semibold ">
                      {info?.fname || "N/A"}
                    </span>
                  </div>
                  <div className="flex px-2 gap-y-2 justify-start text-left">
                    <span className="text-[14px] leading-[20px] ">
                      Interviewee Last Name:
                    </span>
                    <span className=" ml-2 text-[14px] leading-[20px] font-nunito font-semibold ">
                      {info?.lname || "N/A"}
                    </span>
                  </div>
                  <div className="flex px-2 gap-y-2 justify-start text-left">
                    <span className="text-[14px] leading-[20px] ">NIC:</span>
                    <span className=" ml-2 text-[14px] leading-[20px] font-nunito font-semibold ">
                      {info?.nic || "N/A"}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 place-items-start  mt-2">
                  <div className="flex px-2 gap-y-2 justify-start text-left">
                    <span className="text-[14px] leading-[20px] ">
                      Interview Conducted Date:
                    </span>
                    <span className=" ml-2 text-[14px] leading-[20px] font-nunito font-semibold ">
                      {formatDateTime(interview?.slot).date || "N/A"}
                    </span>
                  </div>
                  <div className="flex px-2 gap-y-2 justify-start text-left">
                    <span className="text-[14px] leading-[20px] ">
                      Date Of Birth:
                    </span>
                    <span className=" ml-2 text-[14px] leading-[20px] font-nunito font-semibold ">
                      {formatDateTime(info?.dob).date || "N/A"}
                    </span>
                  </div>
                  <div className="flex px-2 gap-y-2 justify-start text-left">
                    <span className="text-[14px] leading-[20px] ">Gender:</span>
                    <span className=" ml-2 text-[14px] leading-[20px] font-nunito font-semibold ">
                      {info?.gender || "N/A"}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 place-items-start  mt-2">
                  <div className="flex px-2 gap-y-2 justify-start text-left">
                    <span className="text-[14px] leading-[20px] ">Nationality:</span>
                    <span className=" ml-2 text-[14px] leading-[20px] font-nunito font-semibold ">
                      {info?.nationality || "N/A"}
                    </span>
                  </div>
                  <div className="flex px-2 gap-y-2 justify-start text-left">
                    <span className="text-[14px] leading-[20px] ">Religion:</span>
                    <span className=" ml-2 text-[14px] leading-[20px] font-nunito font-semibold ">
                      {info?.religion || "N/A"}
                    </span>
                  </div>
                  <div className="flex flex-col md:flex-row px-2 gap-y-2 justify-start text-left">
                    <span className="text-[14px] leading-[20px] ">Designation:</span>
                    <span className=" ml-0 md:ml-2 text-[14px] leading-[20px] font-nunito font-semibold ">
                      {info?.designation || "N/A"}
                    </span>
                  </div>
                </div>

                {feedback?.filter((item: any) => item?.slot === interview.slot && item?.hr_id === interview.hr_id && item?.user_id === interview.user_id).map((feedback: any) => (
                  <div key={feedback?.id} className="my-6">
                  <div className="flex flex-col px-2 gap-y-2 justify-start text-left">
                    <span className="text-[20px] leading-[20px] font-semibold font-nunito mt-3 ">
                      Strengths:
                    </span>
                    <span className="text-[14px] leading-[20px]  ">
                      {feedback?.strength || "N/A"}
                    </span>
                  </div>
                  <div className="flex flex-col px-2 gap-y-2 justify-start text-left">
                    <span className="text-[20px] leading-[20px] font-semibold font-nunito mt-3 ">
                      Weaknesses:
                    </span>
                    <span className="text-[14px] leading-[20px]  ">
                     {feedback?.weakness || "N/A"}
                    </span>
                  </div>
                  <div className="flex flex-col px-2 gap-y-2 justify-start text-left">
                    <span className="text-[20px] leading-[20px] font-semibold font-nunito mt-3 ">
                      Comments:
                    </span>
                    <span className="text-[14px] leading-[20px]  ">
                      {feedback?.description || "N/A"}
                    </span>
                  </div>
                </div>
                ))}
                



              </div>

            ))}


          </div>
        ))}

      </div>
      ): (<div className="w-full "> <SkeletonLoaderCustom/> </div>)}
      
      
    </div>
  );
}
