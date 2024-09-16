"use client"
import { useState, useEffect } from 'react';
import useUserData from '@/lib/db/userData';
import { Metadata } from "next";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDateRangePicker } from "@/app/dashboard/components/date-range-picker";
import { MainNav } from "@/app/dashboard/components/main-nav";
import { Overview } from "@/app/dashboard/components/overview-user";
import { RecentSales } from "@/app/dashboard/components/recent-sales-user";
import { Search } from "@/app/dashboard/components/search";
import { UserNav } from "@/app/dashboard/components/user-nav";
import { format } from 'date-fns';
import NavBar from './NavBar';
import MainUsers from '@/lib/db/mainUsers';
import InterviewData from '@/lib/db/interviewData';
import { useRouter } from 'next/navigation';
import HrData from '@/lib/db/hrData';
import toast from 'react-hot-toast';
import FeedbackUserModal from '@/app/feedback/user/FeedbackUserModal';
import FeedbackData from '@/lib/db/feedbackData';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const Modal = ({ onClose, hr_id, slot }: { onClose: () => void, hr_id: any, slot: any }) => {




  return (
    <div className="fixed  inset-0 z-40 overflow-y-auto flex items-center justify-center">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={onClose}></div>


      <div className=" px-4 mt-16 rounded-3xl h-[90%] relative z-20"> {/* Set a higher z-index */}
        {/* <ShareProfileModal/> */}
        <FeedbackUserModal onClose={onClose} id={hr_id} slot={slot} />
      </div>


    </div>
  );
};


const ConductedUSER = () => {


  const router = useRouter();
  const { userData } = useUserData();
  const { hrTable } = HrData();
  const { interviews } = InterviewData();
  const [reject, setReject] = useState(false);
  const [reportUserId, setReportUserId] = useState("");
  const { users } = MainUsers();
  const [showModal, setShowModal] = useState(false);
  const [slot, setSlot] = useState("");
  const [hr_id, setHr_id] = useState("");
  const { feedback } = FeedbackData();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  // const [user_id, setUser_id] = useState("");


  const formatDateTime = (dateTimeString: any) => {
    const optionsDate: any = { year: 'numeric', month: 'long', day: 'numeric' };
    const optionsTime: any = { hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };

    const date = new Date(dateTimeString);
    const formattedDate = format(date, 'dd-MMMM-yyyy', optionsDate);
    const formattedTime = format(date, 'HH:mm:ss zzz', optionsTime);

    return {
      date: formattedDate,
      time: formattedTime,
    };
  };

  const filteredInterviews = interviews.filter((item: any) => item.user_id === userData?.id);
  // //console.log("Filtered Interviews at DashboardHR: ", filteredInterviews);
  const totalInterviews = filteredInterviews.filter((item: any) => item.is_confirmed === "confirmed");
  // //console.log("Total Interviews: ", totalInterviews);
  const conductedInterviews = totalInterviews.filter((item: any) => item.is_conducted === "conducted").reverse();
  // //console.log("Conducted Interviews: ", conductedInterviews);
  const upcomingInterviews = totalInterviews.length - conductedInterviews.length;
  // //console.log("Upcoming Interviews: ", upcomingInterviews);
  const upcomingSchedules = totalInterviews.filter((item: any) => item.is_conducted === "notConducted").reverse();
  // //console.log("Upcoming Schedules: ", upcomingSchedules);
  const filteredHrData = hrTable?.filter((item: any) => item.user_id === userData?.id);


  const userNotification = users.filter((item: any) =>
    filteredInterviews.map((interview: any) => interview.hr_id).includes(item.id));
  // //console.log("UserNotification: ", userNotification);



  const sortedUpcomingSchedules = conductedInterviews.sort((a: any, b: any) => {
    const dateA = new Date(a.slot);
    const dateB = new Date(b.slot);

    if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
      throw new Error('Invalid date');
    }

    return dateB.getTime() - dateA.getTime();
  });



  //   const currentTime = new Date();

  // const sortedUpcomingSchedules = conductedInterviews.sort((a, b) => {
  //     const dateA = new Date(a.slot);
  //     const dateB = new Date(b.slot);

  //     if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
  //       throw new Error('Invalid date');
  //     }

  //     const diffA = dateA.getTime() - currentTime.getTime();
  //     const diffB = dateB.getTime() - currentTime.getTime();

  //     if (diffA >= 0 && diffB >= 0) {
  //       // Both dates are in the future, sort by the closest to the current time
  //       return diffA - diffB;
  //     } else if (diffA < 0 && diffB < 0) {
  //       // Both dates are in the past, sort by the closest to the current time
  //       return diffB - diffA;
  //     } else if (diffA >= 0 && diffB < 0) {
  //       // A is in the future, B is in the past, A should come before B
  //       return -1;
  //     } else if (diffA < 0 && diffB >= 0) {
  //       // A is in the past, B is in the future, B should come before A
  //       return 1;
  //     }

  //     return 0;
  // });




  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = sortedUpcomingSchedules.slice(firstItemIndex, lastItemIndex);


  async function onClickFeedback(hr_id: any, slot: any) {
    // alert("Shifting to Feedback Page!");
    toast.success("Shifting to Feedback Page!");
    router.push(`/feedback/user/${hr_id}?slot=${slot}`);
  }









  return (
    <div className='font-nunito'>
      <h2 className='font-bold mt-0 px-0 md:px-4 text-3xl text-[#242E49]'>Conducted Interviews</h2>
      <div className='h-full min-h-[400px] max-h-[400px] overflow-y-auto'>
        {/* CONDUCTED INTERVIEWS */}
        {/* {userNotification?.map((user: any) => ( */}
          <div  className='px-0 md:px-4'>
            {/* // .filter((interview: any) => interview.hr_id === user.id) */}
            {currentItems?.sort((a: any, b: any) => {
              const dateA = new Date(a.slot);
              const dateB = new Date(b.slot);

              if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
                throw new Error('Invalid date');
              }

              // Compare dates first
              if (dateA.toDateString() !== dateB.toDateString()) {
                return dateB.getTime() - dateA.getTime(); // Sort by date in descending order
              } else {
                // If dates are the same, compare times
                return dateB.getTime() - dateA.getTime(); // Sort by time in descending order
              }
            }).map((item: any) => (
              <div key={item.id} className={`flex w-full flex-col md:flex-row space-y-4 md:space-y-0 justify-between bg-white px-6 py-8 shadow-md rounded-xl my-6 items-left md:items-center `}>

                <div className='flex ml-3 self-start md:self-center '>
                  <Avatar className="h-12 w-12 md:w-16 md:h-16">
                    <AvatarImage src={userNotification.filter((user:any)=> user.id === item.hr_id)[0]?.image} />
                    {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                    <AvatarFallback>OM</AvatarFallback>
                  </Avatar>
                </div>
                <div className="ml-4 space-y-4  md:space-y-1 flex-grow">
                  <p className="text-sm md:text-lg font-bold leading-none">{userNotification?.filter((user:any)=> user.id === item.hr_id)[0]?.username}</p>
                  <p className="text-sm md:text-md text-muted-foreground">{userNotification?.filter((user:any)=> user.id === item.hr_id)[0]?.email}</p>

                  <div className='ml-auto flex lg:hidden text-xs'>
                    <p className='text-xs'>
                      <span className='text-md text-[#6D6D6D]'>Date: </span>  <span className='text-[#333333]'>{formatDateTime(item.slot).date}</span>
                      <br />
                      <span className='text-md text-[#6D6D6D]'> Time: </span>  <span className='text-[#333333]'>{formatDateTime(item.slot).time}</span>
                    </p>
                  </div>


                  {/* {feedback?.filter((feedback: any) => feedback.hr_id === item.hr_id && feedback.slot === item.slot && feedback.user_id === item.user_id).map((feed: any) => ( */}
                  <div className={`flex space-x-4 xl:space-x-0 flex-grow justify-start lg:hidden`}>

                    <Button disabled={
                      !!feedback?.find(
                        (feedbackItem: any) =>
                          feedbackItem.hr_id === item.hr_id &&
                          feedbackItem.slot === item.slot &&
                          feedbackItem.user_id === item.user_id &&
                          feedbackItem.user_feedback?.length > 0 &&
                          feedbackItem.user_feedback !== null
                      )
                    } className='  bg-[#4765FF] hover:bg-[#4765FF]/80 rounded-lg ' onClick={() => { setHr_id(item.hr_id); setSlot(item.slot); setShowModal(true) }}>Give Feedback</Button>
                    {showModal && (
                      <Modal
                        onClose={() => setShowModal(false)}
                        hr_id={hr_id}
                        slot={slot}
                      />
                    )}

                    {/* <div className={``}>
                          <Button disabled={feed?.user_feedback?.length > 0 && feed?.user_feedback !== null} className='  bg-[#4765FF] hover:bg-[#4765FF]/80 rounded-lg ' onClick={() => { setHr_id(item.hr_id); setSlot(item.slot); setShowModal(true) }}>Give Feedback</Button>
                          {showModal && (
                            <Modal
                              onClose={() => setShowModal(false)}
                              hr_id={hr_id}
                              slot={slot}
                            />
                          )}
                        </div> */}



                    <Button className='bg-[#4765FF] hover:bg-[#4765FF]/80 rounded-lg' onClick={() => router.push(`/interview-report?id=${item.id}`)}>Generate Report</Button>



                  </div>

                  {/* // ))} */}

                </div>

                <div className="ml-auto font-medium hidden lg:flex lg:mx-auto lg:space-x-16">
                  <div className='flex flex-col space-y-2'><span className='text-md text-[#6D6D6D]'>Date</span>  <span className='text-[#333333]'>{formatDateTime(item.slot).date}</span> </div>

                  <div className='flex flex-col space-y-2'><span className='text-md text-[#6D6D6D]'> Time </span>  <span className='text-[#333333]'>{formatDateTime(item.slot).time}</span></div>

                </div>


                <div className='hidden space-x-6 flex-grow justify-end lg:flex'>

                  <Button disabled={
                    !!feedback?.find(
                      (feedbackItem: any) =>
                        feedbackItem.hr_id === item.hr_id &&
                        feedbackItem.slot === item.slot &&
                        feedbackItem.user_id === item.user_id &&
                        feedbackItem.user_feedback?.length > 0 &&
                        feedbackItem.user_feedback !== null
                    )
                  } className=' bg-[#4765FF] hover:bg-[#4765FF]/80  h-11 rounded-lg' onClick={() => { setHr_id(item.hr_id); setSlot(item.slot); setShowModal(true) }}>Give Feedback</Button>
                  {showModal && (
                    <Modal
                      onClose={() => setShowModal(false)}
                      hr_id={hr_id}
                      slot={slot}
                    />
                  )}



                  {/* {feedback?.filter((feedback: any) => feedback.hr_id === item.hr_id && feedback.slot === item.slot && feedback.user_id === item.user_id).map((feed: any) => (
                        
                        <div className={``}>
                        <Button disabled={feed?.user_feedback?.length > 0 && feed?.user_feedback !== null} className=' bg-[#4765FF] hover:bg-[#4765FF]/80  h-11 rounded-lg' onClick={() => { setHr_id(item.hr_id); setSlot(item.slot); setShowModal(true) }}>Give Feedback</Button>
                      {showModal && (
                        <Modal
                          onClose={() => setShowModal(false)}
                          hr_id={hr_id}
                          slot={slot}
                        />
                      )}
                        </div>
                      ))} */}



                  <Button className='bg-[#4765FF] hover:bg-[#4765FF]/80  h-11 rounded-lg ' onClick={() => router.push(`/interview-report?id=${item.id}`)}>Generate Report</Button>
                  {/* <Button>Edit Feedback</Button> */}
                  {/* <Button>Delete</Button> */}
                </div>



              </div>


            ))}
          </div>
        {/* // ))} */}
      </div>
      <div className='mt-16'>
        <PaginationSection
          totalItems={conductedInterviews.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  )
}

export default ConductedUSER


function PaginationSection({ totalItems, itemsPerPage, currentPage, setCurrentPage }: {
  totalItems: any,
  itemsPerPage: any,
  currentPage: any,
  setCurrentPage: any,
}
) {

  let pages = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pages.push(i);
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const handleNextPage = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious className='cursor-pointer hover:bg-neutral-200' onClick={() => handlePrevPage()} />
        </PaginationItem>

        {pages.map((page, idx) => (
          <PaginationItem key={idx} >
            <PaginationLink className={currentPage === page ? "bg-[#4765FF] hover:bg-[#4765FF] text-white hover:text-white cursor-pointer rounded-md" : "hover:bg-[#4765FF] hover:text-white cursor-pointer"} onClick={() => setCurrentPage(page)}>
              {page}
            </PaginationLink>
          </PaginationItem>

        ))}

        <PaginationItem>
          <PaginationNext className='cursor-pointer hover:bg-neutral-200' onClick={() => handleNextPage()} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )


}