"use client"
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Metadata } from "next";
import Image from "next/image";
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDateRangePicker } from "@/app/dashboard/components/date-range-picker";
import { MainNav } from "@/app/dashboard/components/main-nav";
import { Overview } from "@/app/dashboard/components/overview";
import { RecentSales } from "@/app/dashboard/components/recent-sales";
import { Search } from "@/app/dashboard/components/search";
import { UserNav } from "@/app/dashboard/components/user-nav";
import useUserData from '@/lib/db/userData';
import Link from 'next/link';
import { format } from 'date-fns';
import NavBar from './NavBar';
import MainUsers from '@/lib/db/mainUsers';
import InterviewData from '@/lib/db/interviewData';
import { useRouter } from 'next/navigation';
import HrData from '@/lib/db/hrData';
import FeedbackData from '@/lib/db/feedbackData';
import Rating from './Rating';
import VerificationData from '@/lib/db/vertificationData';
import toast from 'react-hot-toast';
import ReportsData from '@/lib/db/reportsData';
import { Check, Plus } from 'lucide-react';
import JobData from '@/lib/db/jobData';
import SkillModal from './SkillModal';
import jobSkillsData from '@/lib/db/jobSkillsData';
import { X } from 'lucide-react';
import SkeletonLoaderCustom from '@/components/SkeletonLoaderCustom';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import SpinnerLoader from './SpinnerLoader';

export const AccountsApproval = () => {
    const [showSkillModal, setShowSkillModal] = useState(false);
    const [skillId, setskillId] = useState(0);
    const { userData, status } = useUserData();
    const router = useRouter();
    const { interviews } = InterviewData();
    const { users } = MainUsers();
    const [loading, setLoading] = useState(false);
    const [reject, setReject] = useState(false);
    const { hrTable } = HrData();
    const { feedback } = FeedbackData();
    const { verification } = VerificationData();
    const { reports } = ReportsData();
    const filteredFeedback = feedback?.filter((item: any) => item.hr_id === userData?.id);
    // const [isReportsVisible, setIsReportsVisible] = useState<UserReportsVisibility>({});
    const { jobs } = JobData();
    const [showJobModal, setShowJobModal] = useState(false);
    const { jobSkill } = jobSkillsData();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);


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

    async function onClickRoute(id: any) {
        router.push(`/profile?id=${id}`)
    }

    useEffect(() => {
        // Check if there is no user data (e.g., user logged out)
        if (status === "404") {
            // //console.log("No user data found.");
            // //console.log("Status: " + status);
            // alert("No User Found!");
            toast.error("No User Found!");
            // //console.log("NO user Found!");
            router.push("/login");
        }

        if (userData && userData?.role !== 'admin') {
            // alert("No User Found!");
            toast.error("Not Allowed!");
            router.push("/dashboards");
        }


    }, [userData, status, router]);



    async function onClickApprove(user_id: any, is_approve: any) {
        try {
            const res = await fetch("/api/hr2", {
                method: 'PUT',
                body: JSON.stringify({ is_approve: is_approve, user_id: user_id }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },

            })

            if (!res.ok) {
                // alert("Error submitting data")
                toast.error("Error submitting data");
                return;
            }

            if (is_approve === "approved") {
                toast.success("Account is approved")
                window.location.reload();
                return;
            }
            else if (is_approve === "unapproved") {
                toast.success("Account is not approved")
                window.location.reload();
                return;
            }
        } catch (error) {
            // //console.log(error);

        }
    }

    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const pendingItems = hrTable.filter((item:any)=> item.is_approve === "pending");
    const currentItems = pendingItems.slice(firstItemIndex, lastItemIndex);
    const pending = hrTable.filter((item:any)=> item.is_approve === "pending")
    //   const currentItems = [];
    console.log("Current Items: ", currentItems);
    console.log("Pending: ", pending);
    
    
    const [screenLoading, setScreenLoading] = useState(true);

    useEffect(() => {
        setScreenLoading(true);
        setTimeout(() => {
            setScreenLoading(false);
        }, 2000);
    }, []);


    return (
        <div>

            {screenLoading ? (
                <SpinnerLoader />
            ) : (
                <>
                    <div className='px-[12px] lg:px-8'>

                        {userData && userData?.role === "admin" ? (
                            <div className='min-h-[500px]'>
                                <h1 className="font-bold text-2xl mt-8 mb-4">Account Approval List: </h1>
                                {currentItems.length === 0 && (<div className="flex w-full h-screen justify-center items-center"><div className="flex bg-white w-[800px] px-2 h-[200px] justify-center rounded-lg shadow-md items-center"> <h1 className="font-nunito text-center font-bold text-3xl text-[#242E49]">No Account for Approval Found</h1></div></div>)}
                                {users.map((user: any) => (
                                    <div key={user.id} className="">
                                        {currentItems
                                            .filter((info: any) => info.user_id === user.id && info.is_approve === "pending" && user.role === 'hr')
                                            .map((item: any, index: number) => (

                                                <div key={item.id} className={`flex my-2 items-center justify-around bg-white p-4 shadow-md rounded-lg `}>

                                                    <div className='flex flex-row items-center justify-around'>
                                                        <div >
                                                            <Avatar className="h-9 w-9">
                                                                <AvatarImage src={user.image} />
                                                                <AvatarFallback>OM</AvatarFallback>
                                                            </Avatar>
                                                        </div>
                                                        <div className="ml-4 space-y-4  lg:space-y-1 flex-grow">
                                                            <p className="text-sm font-medium leading-none">{user.username}</p>
                                                            <p className="text-sm text-muted-foreground">{user.email}</p>

                                                            <div className="ml-auto flex lg:hidden text-xs">Date: {formatDateTime(user.createdAt).date}
                                                                <br />
                                                                Time: {formatDateTime(user.createdAt).time}
                                                            </div>

                                                            <div className='flex flex-col  lg:hidden flex-grow items-start space-y-6'>

                                                                <div className='flex space-x-6'>
                                                                    <div >
                                                                        <Button className='text-xs bg-[#ECF2FF] text-[#4765FF] hover:bg-[#ECF2FF]/80  h-11 rounded-lg' onClick={() => onClickRoute(user.id)}>View Profile</Button>
                                                                    </div>

                                                                    <div >
                                                                        <Button className=' bg-[#06A561] hover:bg-[#06A561]/80  h-11 rounded-lg flex space-x-1 text-xs' onClick={() => onClickApprove(user.id, "approved")}>Approve Profile</Button>
                                                                    </div>
                                                                </div>

                                                                <div className='flex space-x-6'>
                                                                    <Button className='text-xs bg-[#F43F5E] hover:bg-[#F43F5E]/80  h-11 rounded-lg flex space-x-2' onClick={() => onClickApprove(user.id, "unapproved")}>Decline Approval</Button>
                                                                </div>
                                                            </div>


                                                        </div>


                                                        <div className="ml-auto font-medium text-sm hidden lg:flex justify-between w-[40%]">
                                                            <div>
                                                                <span> Date </span> <br />{formatDateTime(user.createdAt).date}
                                                            </div>

                                                            <div>
                                                                <span> Time </span> <br />{formatDateTime(user.createdAt).time}
                                                            </div>
                                                        </div>

                                                    </div>


                                                    <div className='hidden lg:flex space-x-6 flex-grow justify-end '>
                                                        <Button className="bg-[#ECF2FF] text-[#4765FF] hover:bg-[#ECF2FF]/80  h-11 rounded-lg" onClick={() => onClickRoute(user.id)}>View Profile</Button>
                                                    </div>

                                                    <div className='hidden lg:flex space-x-6 flex-grow justify-end'>
                                                        <Button className='bg-[#06A561] hover:bg-[#06A561]/80  h-11 rounded-lg flex space-x-1 text-xs' onClick={() => onClickApprove(user.id, "approved")}><Check className=' block lg:hidden' size={20} /> <span className='hidden lg:block'> Approve Profile</span> </Button>
                                                    </div>

                                                    <div className='hidden lg:flex space-x-6 flex-grow justify-end'>
                                                        <Button className='bg-[#F43F5E] hover:bg-[#F43F5E]/80  h-11 rounded-lg flex space-x-2' onClick={() => onClickApprove(user.id, "unapproved")}>Decline Approval</Button>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>

                                ))}
                            </div>
                        ) : (<SpinnerLoader />)}


                    </div>
                    <div className='mt-16'>
                        <PaginationSection
                            totalItems={pending.length}
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>
                </>
            )}



        </div>
    )
}


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