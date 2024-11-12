"use client"
import React from 'react'
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react';
import useUserData from '@/lib/db/userData';
import Link from 'next/link';
import { format } from 'date-fns';
import MainUsers from '@/lib/db/mainUsers';
import InterviewData from '@/lib/db/interviewData';
import HrData from '@/lib/db/hrData';
import FeedbackData from '@/lib/db/feedbackData';
import toast from 'react-hot-toast';
import { Check, Plus, Trash } from 'lucide-react';
import JobData from '@/lib/db/jobData';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import jobSkillsData from '@/lib/db/jobSkillsData';
import { X } from 'lucide-react';
import moment from 'moment-timezone';


function Confirmation({ id }: any) {

  const { hrTable } = HrData();
  // const {interviews} = InterviewData();
  const { userData } = useUserData();
  // const [interviews, setInterviews] = useState([]);
  const { users } = MainUsers();
  const { interviews } = InterviewData();
  // const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reject, setReject] = useState(false);
  const router = useRouter();
  const filteredUsersMain = users?.filter((item: any) => item?.id === id);
  // //console.log("Filtered Users Main for Email: ", filteredUsersMain);

  // const search = searchRouter();
  // //console.log("Search SLot: ", search.query );

  const searchParams = useSearchParams();
  const slot = searchParams.get('slot');

  // const slot = router.query.slot;
  // //console.log("Id: ", id);

  // //console.log("Slot from URL: ", slot);



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


  function onClickRoute() {
    router.push(`/profile/${id}`);
  }

  async function onClickConfirm() {
    try {
      setLoading(true);
      const data = await fetch("/api/interview", {
        method: 'PUT',
        body: JSON.stringify({ hr_id: userData?.id, user_id: id, slot: slot, is_confirmed: "confirmed" }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },

      });
      if (!data.ok) {
        toast.error("Error in confirming interview");
        // //console.log("Error in confirming interview: ", data);

        return;
      }
      // alert("Confirmed!");

      toast.success("Interview is Confirmed")

      // Email sending code

      const subject = "Interview Confirmation";
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
                          <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                            <div class="spacer_block block-1" style="height:60px;line-height:60px;font-size:1px;">&#8202;</div>
                            <div class="spacer_block block-2" style="height:30px;line-height:30px;font-size:1px;">&#8202;</div>
                            <table class="heading_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad">
                                  <h1 style="margin: 0; color: #ffffff; direction: ltr; font-family: Nunito, Arial, Helvetica Neue, Helvetica, sans-serif; font-size: 58px; font-weight: 700; letter-spacing: normal; line-height: 150%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 87px;"><span class="tinyMce-placeholder">Interview Confirmation</span></h1>
                                </td>
                              </tr>
                            </table>
                            <table class="paragraph_block block-4" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                              <tr>
                                <td class="pad">
                                  <div style="color:#e3e6ff;direction:ltr;font-family:Nunito, Arial, Helvetica Neue, Helvetica, sans-serif;font-size:22px;font-weight:400;letter-spacing:0px;line-height:150%;text-align:left;mso-line-height-alt:33px;">
                                    <p style="margin: 0; margin-bottom: 16px;">Dear ${filteredUsersMain[0]?.username},</p>
                                    <p style="margin: 0; margin-bottom: 16px;">Greetings,<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; We are pleased to inform you that your face-to-face (video conference) interview with Mr. ${userData?.username} is confirmed to be held at ${formatDateTime(slot).time} on ${formatDateTime(slot).date}. The duration of the interview will be of 30 mins.</p>
                                    <p style="margin: 0; margin-bottom: 16px;"><br>The conference link will be shared 15 mins prior to your interview time.</p>
                                    <p style="margin: 0; margin-bottom: 16px;">Best regards,<br>Copyright © 2024 Recruiters Nexus, All rights reserved.</p>
                                    <p style="margin: 0; margin-bottom: 16px;"><br>You are receiving this email because you opted in via our website.</p>
                                    <p style="margin: 0;">Our mailing address is:<br>Recruiters Nexus<br>Village Kanate </br> Distt. & Tehsil Mansehra <br/> KPK <br/> Pakistan.</p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <div class="spacer_block block-5" style="height:25px;line-height:25px;font-size:1px;">&#8202;</div>
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
                          <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-left: 25px; padding-right: 25px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                            <div class="spacer_block block-1" style="height:35px;line-height:35px;font-size:1px;">&#8202;</div>
                            <div class="spacer_block block-2" style="height:55px;line-height:55px;font-size:1px;">&#8202;</div>
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

      try {
        const res = await fetch("/api/mail", {
          method: 'POST',
          body: JSON.stringify({ subject: subject, message: message, userEmail: filteredUsersMain[0]?.email }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          },

        })

        if (!res.ok) {
          toast.error("Error Sending Warning Email");
          return;
        }

        // toast.success("Interview confirmation Sent")
        // window.location.reload();
      } catch (error) {
        // //console.log("Error in sending warning mail!");

        // //console.log(error);
      }

      const formattedSlot = moment.utc(slot).format();
      const delSlot = await fetch("/api/getServices", {
        method: 'DELETE',
        body: JSON.stringify({ user_id: userData?.id, slot: formattedSlot }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },

      });

      return delSlot.json();
    } catch (error) {
      // //console.log(error);
    } finally {
      setLoading(false);
      router.push("/dashboards");
    }
  }

  async function onClickReject() {

    try {
      setReject(true);
      const data = await fetch("/api/interview", {
        method: 'DELETE',
        body: JSON.stringify({ hr_id: userData?.id, user_id: id, slot: slot, is_confirmed: "unConfirmed" }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },

      });
      // alert("Rejected!");
      toast.error("Interview is Rejected")
      return data.json();
    } catch (error) {
      // //console.log(error);
    } finally {
      setReject(false);
      router.push("/dashboards");
    }

  }

  //console.log("Time Slots: ", interviews);

  const filteredInterviews = interviews.filter((item: any) => item.hr_id === userData?.id);
  // //console.log("Filtered Interviews at DashboardHR: ", filteredInterviews);
  const interviewRequests = filteredInterviews.filter((item: any) => item.is_confirmed === "unConfirmed");
  // //console.log("Interview Requests: ", interviewRequests);

  const totalInterviews = filteredInterviews.filter((item: any) => item.is_confirmed === "confirmed");
  // //console.log("Total Interviews: ", totalInterviews);
  const conductedInterviews = totalInterviews.filter((item: any) => item.is_conducted === "conducted")
  // //console.log("Conducted Interviews: ", conductedInterviews);
  const upcomingInterviews = totalInterviews.length - conductedInterviews.length;
  // //console.log("Upcoming Interviews: ", upcomingInterviews);
  const upcomingSchedules = totalInterviews.filter((item: any) => item.is_conducted === "notConducted")
  // //console.log("Upcoming Schedules: ", upcomingSchedules);


  const userNotification = users.filter((item: any) =>
    filteredInterviews.map((interview: any) => interview.user_id).includes(item.id));
  // //console.log("UserNotification: ", userNotification);

  return (
    <div className='flex flex-col space-y-16 items-center justify-center h-screen w-full '>

      <div className='bg-white p-10 rounded-lg shadow-md w-[80%] h-[80%] md:w-[1000px] md:h-[60%] flex flex-col space-y-0 items-start justify-center'>
        <div className='text-[#242E49] px-8'>
          <h1 className='text-lg md:text-3xl font-bold text-left'>Please Confirm or Reject the interview</h1>
        </div>



        {userNotification.map((user: any) => (
        <div key={user.id} className=" h-full w-full flex justify-center items-center">
          {filteredInterviews
            .filter((interview: any) => interview.slot === slot)
            .map((interview: any, index: number) => (
              
                <div key={index} className='flex w-[950px] flex-col justify-center  px-4 py-8  '>
                  {/* here div */}
                  <h2 className='mb-6 px-4 font-bold'>{hrTable?.find((hr: any) => hr.user_id === user.id)?.fname} requsted for an interview</h2>

                  <div key={interview.id} className={`flex  px-4`}>
                    <Avatar className="h-9 w-9 md:h-16 md:w-16">
                      <AvatarImage src={user?.image} />
                      {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                      <AvatarFallback>OM</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1 ">
                      <p className="text-sm md:text-xl font-bold leading-none">{user.username}</p>
                      <p className="text-sm md:text-lg text-muted-foreground">{user.email}</p>

                      <div className='ml-auto flex md:hidden text-xs'>
                        <p className='text-xs'>
                          Date: {formatDateTime(interview.slot).date}
                          <br />
                          Time: {formatDateTime(interview.slot).time}
                        </p>
                      </div>

                    </div>
                    <div className="ml-auto font-medium hidden md:flex md:mx-auto md:space-x-16">
                      <div className='flex flex-col space-y-2'><span className='text-md text-[#6D6D6D]'>Date</span>  <span className='text-[#333333]'>{formatDateTime(interview.slot).date}</span> </div>

                      <div className='flex flex-col space-y-2'><span className='text-md text-[#6D6D6D]'> Time </span>  <span className='text-[#333333]'>{formatDateTime(interview.slot).time}</span></div>

                    </div>

                    
                       <Button className='bg-[#ECF2FF] text-[#4765FF] hover:bg-[#ECF2FF]/80  h-11 rounded-lg' onClick={onClickRoute}>View Profile</Button>
                    


                  </div>
                  <div className='flex space-x-5 my-4 px-4'>
                  <Button className='bg-[#F43F5E] hover:bg-[#F43F5E]/80  h-11 rounded-lg flex space-x-2' onClick={onClickReject}><Trash size={14} />{`${reject?"Rejected":"Reject"}`}</Button> 
                  <Button className='bg-[#06A561] hover:bg-[#06A561]/80  h-11 rounded-lg flex space-x-2' onClick={onClickConfirm}><Check size={20} />{`${loading?"Confirming!!":"Confirm"}`}</Button> 
                  </div>
                </div>
           

                
              ))}
          
        </div>

      ))}




      </div>


    </div>
  )
}



export default Confirmation