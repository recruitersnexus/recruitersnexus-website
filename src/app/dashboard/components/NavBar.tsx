"use client"
import React from 'react'
import { UserNav } from "@/app/dashboard/components/user-nav";
import { MainNav } from "@/app/dashboard/components/main-nav";
import { Search } from "@/app/dashboard/components/search";
import useUserData from '@/lib/db/userData';
import SkeletonLoaderNavbar from '@/components/SkeletonLoaderNavbar';
import { useState } from 'react';
import Link from 'next/link';
import { Bell, Share2 } from 'lucide-react';
import Image from 'next/image';
import Notifications from './Notifications';
import HrData from '@/lib/db/hrData';
import InterviewData from '@/lib/db/interviewData';
import MainUsers from '@/lib/db/mainUsers';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';
import ShareProf from '@/app/shareProfile/ShareProf';
import ShareProfileModal from '@/app/shareProfile/ShareProfileModal';
import SkeletonLoaderResNavbar from '@/components/SkeletonLoaderResNavBar';


const Modal = ({ onClose }: { onClose: () => void }) => {




    return (
        <div className="fixed  inset-0 z-10 overflow-y-auto flex items-center justify-center">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={onClose}></div>


            <div className="bg-white p-8 rounded-3xl max-w-md relative z-20"> {/* Set a higher z-index */}
                <ShareProfileModal />
            </div>


        </div>
    );
};

{/* <button onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md">Cancel</button> */ }


const NavBar = () => {
    const [open, setOpen] = useState(false);
    const [bell, setBell] = useState(false);
    const { interviews } = InterviewData();
    const [showModal, setShowModal] = useState(false);
    const pathname = usePathname();

    const router = useRouter();

    const handleClick = () => {
        setOpen(!open);
    };

    const handleClickOpen = () => {
        setBell(!bell);
        router.push('/notifications');
        // if (bell === true) {
        //     router.push('/notifications');
        // }
        // else if (bell === false) {
        //     router.push("/dashboards")
        //     // router.back();

        // }

    };

    const { userData } = useUserData();
    const { users } = MainUsers();
    const { hrTable } = HrData();

    const filteredInterviews = interviews?.filter((item: any) => item.hr_id === userData?.id);
    //console.log("Filtered Interviews at DashboardHR: ", filteredInterviews);
    const totalInterviews = filteredInterviews?.filter((item: any) => item.is_confirmed === "confirmed");
    //console.log("Total Interviews: ", totalInterviews);
    const conductedInterviews = totalInterviews?.filter((item: any) => item.is_conducted === "conducted").reverse();
    //console.log("Conducted Interviews: ", conductedInterviews);
    const upcomingInterviews = totalInterviews?.length - conductedInterviews?.length;
    //console.log("Upcoming Interviews: ", upcomingInterviews);
    const upcomingSchedules = totalInterviews?.filter((item: any) => item.is_conducted === "notConducted").reverse();
    //console.log("Upcoming Schedules: ", upcomingSchedules);
    const filteredHrData = hrTable?.filter((item: any) => item.user_id === userData?.id);

    const userNotification = users?.filter((item: any) =>
        filteredInterviews?.map((interview: any) => interview.user_id).includes(item.id));

    // const notificationsCount = userNotification?.filter((user: any) => filteredInterviews
    //     .filter((interview: any) => interview.user_id === user.id && interview.is_confirmed === "unConfirmed")).length;
    const notificationsCount = filteredInterviews?.filter((interview: any) => interview.is_confirmed === "unConfirmed").length;









    return (
        <div className=''>
            {!userData ? (<div className='w-full h-full'> <SkeletonLoaderResNavbar /> </div>) :
                (
                    <div className='bg-[#FFFFFF] text-white shadow-lg fixed  top-0 w-full z-50 '>
                        <div className="flex-col flex">
                            <div className="border-b">
                                <div className="flex h-16 items-center px-4">

                                    {/* <div className="mr-2 flex md:hidden">
                                        <button onClick={handleClick} type="button" className="bg-[#4765FF] inline-flex items-center justify-center p-2 rounded-[10px] text-white hover:bg-[#4765FF]/55 focus:outline-none" aria-controls="mobile-menu" aria-expanded="false">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                            </svg>


                                        </button>
                                    </div> */}
                                    <div className='md:block w-full ml-5  mb-1.5 cursor-pointer '>
                                        {/* <MainNav /> */}
                                        <Link href={"/dashboards"}>
                                            <Image
                                                className=''
                                                height={120}
                                                width={120}
                                                src="/RN-new-black.png"
                                                alt="logo"
                                            />

                                        </Link>
                                    </div>

                                    <div className="ml-auto flex items-center space-x-1 sm:space-x-6 ">
                                        {/* <Search /> */}

                                        <div className={`flex items-center ${userData?.role === "hr" ? "" : "hidden"} space-x-0 sm:space-x-4`}>
                                            <button onClick={() => setShowModal(true)} className='mr-2'><Share2 color={`black`} size={20} /></button>
                                            {showModal && (
                                                <Modal
                                                    onClose={() => setShowModal(false)}
                                                />
                                            )}
                                            <div className="inline-block h-[30px] min-h-[1em] w-0.5 self-stretch bg-[#E6E9F4] dark:bg-white/10"></div>
                                        </div>

                                        {userData?.role === "hr" &&
                                            <div className='flex items-center relative '>
                                                <span className="bg-blue-500 w-4 h-4 rounded-full text-white text-xs flex items-center justify-center absolute top-[-6px] right-[-4px]">{notificationsCount}</span>
                                                <button onClick={handleClickOpen} className='cursor-pointer bg-'><Bell className='' color={` ${pathname === '/notifications' ? '#4765FF' : 'black'}`} size={24} /></button>

                                                {/* <div className={`w-screen h-screen max-h-[100vh] overflow-y-auto  z-10 ${bell ? 'block' : 'hidden'} bg-[#F2F5F9] rounded-lg shadow-lg p-4 absolute top-[40px] right-[-80px]`}>
                                            <Notifications />
                                            </div> */}
                                            </div>}


                                            {/* --------user dashboard bell icon ---- */}


                                            {userData?.role === "user" &&
                                            <div className='flex items-center relative '>
                                                <span className="bg-blue-500 w-4 h-4 rounded-full text-white text-xs flex items-center justify-center absolute top-[-6px] right-[-4px]">{notificationsCount}</span>
                                                <button onClick={handleClickOpen} className='cursor-pointer bg-'><Bell className='' color={` ${pathname === '/notifications' ? '#4765FF' : 'black'}`} size={24} /></button>

                                                {/* <div className={`w-screen h-screen max-h-[100vh] overflow-y-auto  z-10 ${bell ? 'block' : 'hidden'} bg-[#F2F5F9] rounded-lg shadow-lg p-4 absolute top-[40px] right-[-80px]`}>
                                            <Notifications />
                                            </div> */}
                                            </div>}

                                            {/* user dashboard bell icon end */}
                                        {/* <div className='flex space-x-4 items-center cursor-pointer'> */}
                                        <UserNav />
                                        {/* <ChevronDown size={24} color='black' /> */}
                                        {/* </div> */}
                                    </div>

                                </div>
                                {/* <div className={`${open ? 'block' : 'hidden'}`} id="mobile-menu">
                                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">

                                        {userData?.role === 'hr' ? (
                                            <div className='flex flex-col'>
                                                <Link
                                                    href="/dashboards"
                                                    className="text-white hover:bg-[#4765FF] block px-3 py-2 rounded-md text-base font-medium"
                                                >
                                                    Dashboard
                                                </Link>
                                                <Link
                                                    href="/subServices"
                                                    className="text-white hover:bg-[#4765FF] block px-3 py-2 rounded-md text-base font-medium"
                                                >
                                                    Submit Services
                                                </Link>
                                                <Link
                                                    href="/shareProfile"
                                                    className="text-white hover:bg-[#4765FF] block px-3 py-2 rounded-md text-base font-medium"
                                                >
                                                    Share Profile
                                                </Link>
                                            </div>
                                        ) : userData?.role === 'user' || userData?.role === 'admin' ? (<div className='flex flex-col'>
                                            <Link
                                                href="/dashboards"
                                                className="text-white hover:bg-[#4765FF] block px-3 py-2 rounded-md text-base font-medium"
                                            >
                                                Dashboard
                                            </Link>
                                            <Link
                                                href="/explore"
                                                className="text-white hover:bg-[#4765FF] block px-3 py-2 rounded-md text-base font-medium"
                                            >
                                                Explore Experts
                                            </Link>
                                        </div>) : (<></>)}


                                    </div>
                                </div> */}
                            </div>

                        </div>
                    </div>
                )}


        </div>
    )
}

export default NavBar