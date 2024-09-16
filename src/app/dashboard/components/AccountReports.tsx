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
import { Plus } from 'lucide-react';
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


interface UserReportsVisibility {
    [key: string]: boolean;
}


export const AccountReports = () => {
    const [showSkillModal, setShowSkillModal] = useState(false);
    const [skillId, setskillId] = useState(0);
    const { userData,status } = useUserData();
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
    const [isReportsVisible, setIsReportsVisible] = useState<UserReportsVisibility>({});
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

    const toggleReports = (userId: string) => {
        setIsReportsVisible(prevState => ({
            ...prevState,
            [userId]: !prevState[userId]
        }));
    };

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

    async function onClickSendWarning(userEmail: any, totalReports: any, username: any, userReports: any) {
        const message = `<!DOCTYPE html>
        <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
        
        <head>
            <title></title>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0"><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><!--[if !mso]><!-->
            <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@100;200;300;400;500;600;700;800;900" rel="stylesheet" type="text/css"><!--<![endif]-->
            <style>
                * {
                    box-sizing: border-box;
                }
        
                body {
                    margin: 0;
                    padding: 0;
                }
        
                a[x-apple-data-detectors] {
                    color: inherit !important;
                    text-decoration: inherit !important;
                }
        
                #MessageViewBody a {
                    color: inherit;
                    text-decoration: none;
                }
        
                p {
                    line-height: inherit
                }
        
                .desktop_hide,
                .desktop_hide table {
                    mso-hide: all;
                    display: none;
                    max-height: 0px;
                    overflow: hidden;
                }
        
                .image_block img+div {
                    display: none;
                }
        
                @media (max-width:700px) {
                    .mobile_hide {
                        display: none;
                    }
        
                    .row-content {
                        width: 100% !important;
                    }
        
                    .stack .column {
                        width: 100%;
                        display: block;
                    }
        
                    .mobile_hide {
                        min-height: 0;
                        max-height: 0;
                        max-width: 0;
                        overflow: hidden;
                        font-size: 0px;
                    }
        
                    .desktop_hide,
                    .desktop_hide table {
                        display: table !important;
                        max-height: none !important;
                    }
                }
            </style>
        </head>
        
        <body style="background-color: #ffffff; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
            <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;">
                <tbody>
                    <tr>
                        <td>
                            <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #242e49;">
                                <tbody>
                                    <tr>
                                        <td>
                                            <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #242e49; border-radius: 0; color: #000000; width: 680px; margin: 0 auto;" width="680">
                                                <tbody>
                                                    <tr>
                                                        <td class="column column-1" width="100%" style="font-weight: 400; text-align: left; mso-table-lspace: 0pt; mso-table-rspace: 0pt; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                            <div class="spacer_block block-1" style="height:60px;line-height:60px;font-size:1px;">&#8202;</div>
                                                            <div class="spacer_block block-2" style="height:30px;line-height:30px;font-size:1px;">&#8202;</div>
                                                            <table class="heading_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                <tr>
                                                                    <td class="pad">
                                                                        <h1 style="margin: 0; color: #ffffff; direction: ltr; font-family: Nunito, Arial, Helvetica Neue, Helvetica, sans-serif; font-size: 58px; font-weight: 700; letter-spacing: normal; line-height: 150%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 87px;"><span class="tinyMce-placeholder">WARNING!</span></h1>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                            <table class="paragraph_block block-4" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                <tr>
                                                                    <td class="pad">
                                                                        <div style="color:#e3e6ff;direction:ltr;font-family:Nunito, Arial, Helvetica Neue, Helvetica, sans-serif;font-size:22px;font-weight:400;letter-spacing:0px;line-height:150%;text-align:center;mso-line-height-alt:33px;">
                                                                            <p style="margin: 0; margin-bottom: 16px;">Dear ${username},&nbsp;</p>
                                                                            <p style="margin: 0;">There has been ${totalReports} reports against you. Please try to maintain discipline and be in the meeting on time. Thank you!</p>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                            <table class="button_block block-5" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                <tr>
                                                                    <td class="pad">
                                                                        <div class="alignment" align="center"><!--[if mso]>
        <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="www.example.com" style="height:72px;width:315px;v-text-anchor:middle;" arcsize="0%" stroke="false" fillcolor="#ffffff">
        <w:anchorlock/>
        <v:textbox inset="0px,0px,0px,0px">
        <center style="color:#242e49; font-family:Arial, sans-serif; font-size:21px">
        <![endif]--><a href="www.example.com" target="_blank" style="text-decoration:none;display:inline-block;color:#242e49;background-color:#ffffff;border-radius:0px;width:auto;border-top:0px solid transparent;font-weight:400;border-right:0px solid transparent;border-bottom:0px solid transparent;border-left:0px solid transparent;padding-top:15px;padding-bottom:15px;font-family:Nunito, Arial, Helvetica Neue, Helvetica, sans-serif;font-size:21px;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:45px;padding-right:45px;font-size:21px;display:inline-block;letter-spacing:normal;"><span style="word-break: break-word; line-height: 42px;">Reasons for the reports:</span></span></a><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                            <div class="spacer_block block-6" style="height:25px;line-height:25px;font-size:1px;">&#8202;</div><!--[if mso]><style>#list-r0c0m6 ul{ margin: 0 !important; padding: 0 !important; } #list-r0c0m6 ul li{ mso-special-format: bullet; }#list-r0c0m6 .levelOne li { margin-top: 0 !important; } #list-r0c0m6 .levelOne { margin-left: -20px !important; }#list-r0c0m6 .levelTwo li { margin-top: 0 !important; } #list-r0c0m6 .levelTwo { margin-left: 10px !important; }#list-r0c0m6 .levelThree li { margin-top: 0 !important; } #list-r0c0m6 .levelThree { margin-left: 40px !important; }#list-r0c0m6 .levelFour li { margin-top: 0 !important; } #list-r0c0m6 .levelFour { margin-left: 70px !important; }#list-r0c0m6 .levelFive li { margin-top: 0 !important; } #list-r0c0m6 .levelFive { margin-left: 100px !important; }#list-r0c0m6 .levelSix li { margin-top: 0 !important; } #list-r0c0m6 .levelSix { margin-left: 130px !important; }</style><![endif]-->
                                                            <table class="list_block block-7" id="list-r0c0m6" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                <tr>
                                                                    <td class="pad">
                                                                        <div class="levelOne" style="margin-left: 0;">
                                                                            <ul class="leftList" start="1" style="margin-top: 0; margin-bottom: 0; padding: 0; padding-left: 20px; font-weight: 400; text-align: left; color: #101112; direction: ltr; font-family: Nunito,Arial,Helvetica Neue,Helvetica,sans-serif; font-size: 16px; letter-spacing: 0; line-height: 120%; mso-line-height-alt: 19.2px; list-style-type: disc;">
                                                                                ${userReports?.map((item: any) => (
            `<li style="margin-bottom: 0; text-align: left;"><span style="color: #ffffff;">${item.reason}</span></li>`))
            }
                                                                            </ul>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #242e49;">
                                <tbody>
                                    <tr>
                                        <td>
                                            <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #242e49; border-radius: 0; color: #000000; width: 680px; margin: 0 auto;" width="680">
                                                <tbody>
                                                    <tr>
                                                        <td class="column column-1" width="100%" style="font-weight: 400; text-align: left; mso-table-lspace: 0pt; mso-table-rspace: 0pt; padding-bottom: 5px; padding-left: 25px; padding-right: 25px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                            <table class="paragraph_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                <tr>
                                                                    <td class="pad">
                                                                        <div style="color:#101112;direction:ltr;font-family:Nunito, Arial, Helvetica Neue, Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:19.2px;">
                                                                            <p style="margin: 0;"><span style="color: #ffffff;"><strong>Note</strong>: Your account will be terminated incase you get more than 3 reports.</span></p>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                            <div class="spacer_block block-2" style="height:35px;line-height:35px;font-size:1px;">&#8202;</div>
                                                            <div class="spacer_block block-3" style="height:55px;line-height:55px;font-size:1px;">&#8202;</div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table><!-- End -->
        </body>
        
        </html>`

        const subject = `Warning, You have been reported by a candidate`
        try {
            const res = await fetch("/api/mail", {
                method: 'POST',
                body: JSON.stringify({ subject: subject, message: message, userEmail: userEmail }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },

            })

            if (!res.ok) {
                toast.error("Error Sending Warning Email");
                return;
            }

              toast.success("Warning Email Sent")
        } catch (error) {
            // //console.log("Error in sending warning mail!");

            // //console.log(error);
        }
    }


    async function onClickRoute(id: any) {
        router.push(`/profile?id=${id}`)
    }


    const userIdsWithReports = new Set(reports.map((report: any) => report.user_id));

    const usersWithReports = users.filter((user: any) => userIdsWithReports.has(user.id));

    const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;

  const currentItems = usersWithReports.slice(firstItemIndex, lastItemIndex);

 

// console.log("Users with Reports: ", usersWithReports);
  
//   const currentItems = [];
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
      ) :(
        <>
        {userData && userData?.role === "admin" ? (
                <div className='px-[12px] md:px-8 min-h-[500px]'>
                <h1 className="font-bold text-2xl mt-8 mb-4">Reported Accounts List: </h1>
                {currentItems.length === 0 && (<div className="flex w-full h-screen justify-center items-center"><div className="flex bg-white w-[800px] px-2 h-[200px] text-center justify-center rounded-lg shadow-md items-center"> <h1 className="font-nunito font-bold text-3xl text-[#242E49]">No Reported Accounts Found</h1></div></div>)}
                {currentItems.map((user: any) => {
                    const userReports = reports.filter((report: any) => report.user_id === user.id);
                    if (userReports.length === 0) return null;
                    return (
                        <div key={user.id} className="border bg-white p-4 shadow-md rounded-lg mb-2">
                            <div onClick={() => toggleReports(user.id)} className="cursor-pointer">
                                <div className="flex justify-between items-center mb-2">
                                    <div className='ml-4 space-y-4  md:space-y-1 flex-grow'>
                                        <h2 className="text-lg font-medium">{user.username} {" ("}{user.role}{") "}</h2>
                                        <p className="text-sm text-muted-foreground">{user.email}</p>

                                        <div className='md:hidden flex text-xs items-center space-x-6'>
                                            <Button className='bg-[#F43F5E] hover:bg-[#F43F5E]/80  h-11 rounded-lg flex space-x-2' onClick={(e) => { e.stopPropagation(); onClickSendWarning(user.email, userReports.length, user.username, userReports); }}>Send Warning</Button>
                                            {/* <Button className='flex space-x-6 flex-grow justify-end' onClick={(e) => { e.stopPropagation(); onClickRoute(user.id); }}>Block Account</Button> */}
                                        </div>

                                    </div>
                                    <div className='md:flex hidden items-center space-x-6'>
                                        <Button className='bg-[#F43F5E] hover:bg-[#F43F5E]/80  h-11 rounded-lg flex space-x-2' onClick={(e) => { e.stopPropagation(); onClickSendWarning(user.email, userReports.length, user.username, userReports); }}>Send Warning</Button>
                                        {/* <Button className='flex space-x-6 flex-grow justify-end' onClick={(e) => { e.stopPropagation(); onClickRoute(user.id); }}>Block Account</Button> */}
                                    </div>
                                </div>
                            </div>
                            {isReportsVisible[user.id] && (
                                <div>
                                    <h3>Total Reports: {userReports.length}</h3>
                                    <div>
                                        {userReports.map((report: any, index: number) => (
                                            <div key={report.id} className="border rounded-lg p-2 my-2">
                                                <p>Reason: {report.reason}</p>
                                                {/* You can add additional report details here if needed */}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            ) : (<SpinnerLoader />)}
            
            <div className='mt-16'>
      <PaginationSection 
      totalItems={usersWithReports.length}
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

function PaginationSection({ totalItems, itemsPerPage, currentPage, setCurrentPage }:{totalItems: any,
    itemsPerPage: any,
    currentPage: any,
    setCurrentPage: any,}
  ) {
  
    let pages = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pages.push(i);
    }
  
    const handlePrevPage = () => {
      if(currentPage > 1)
        {
          setCurrentPage(currentPage - 1);
        }
    }
  
    const handleNextPage = () => {
      if(currentPage < pages.length)
        {
          setCurrentPage(currentPage + 1);
        }
    }
  
    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
          <PaginationPrevious className='cursor-pointer hover:bg-neutral-200' onClick={()=> handlePrevPage()} />
        </PaginationItem>
  
        {pages.map((page,idx)=>(
          <PaginationItem key={idx} >
        <PaginationLink className={currentPage === page? "bg-[#4765FF] hover:bg-[#4765FF] text-white hover:text-white cursor-pointer rounded-md":"hover:bg-[#4765FF] hover:text-white cursor-pointer"} onClick={()=>setCurrentPage(page)}>
            {page}
        </PaginationLink>
        </PaginationItem>
  
  ))}
  
        <PaginationItem>
          <PaginationNext className='cursor-pointer hover:bg-neutral-200' onClick={()=> handleNextPage()} />
        </PaginationItem> 
        </PaginationContent>
      </Pagination>
    )
  
  
  }
