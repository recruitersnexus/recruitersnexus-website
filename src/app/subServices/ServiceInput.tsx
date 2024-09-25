"use client"
import React, { FormEvent } from 'react'
import { useState, useEffect } from 'react'
import { MainNav } from '../dashboard/components/main-nav'
import { Search } from '../dashboard/components/search'
import { UserNav } from '../dashboard/components/user-nav'
import useUserData from '@/lib/db/userData'
import { CalendarDateRangePicker } from '../dashboard/components/date-range-picker'
import moment from 'moment-timezone';
import setDefaultOptions from 'date-fns/esm/setDefaultOptions/index'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import SkeletonLoader from '@/components/SkeletonLoader'
import SkeletonLoaderCustom from '@/components/SkeletonLoaderCustom'
import ServiceData from '@/lib/db/serviceData'
import VerificationData from '@/lib/db/vertificationData'
import toast from 'react-hot-toast'
import NavBar from '../dashboard/components/NavBar'
import HrData from '@/lib/db/hrData'
import { AlertCircle } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import SpinnerLoader from '../dashboard/components/SpinnerLoader'



const ServiceInput = () => {
  const { userData, UUID, status } = useUserData();
  const [username, setUsername] = useState(`${userData?.username}`);
  const [service, setService] = useState("")
  // const [user_id, setId] = useState(userData?.id);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  // const [services, setServices] = useState([]);
  const { services } = ServiceData();
  const [disable, setDisable] = useState(false);
  const [deletionStatus, setDeletionStatus] = useState(false);
  const [submit, setSubmitStatus] = useState(false);
  const router = useRouter();
  const { verification } = VerificationData();
  const { hrTable } = HrData();
  const [category, setcategory] = useState("");
  const [radioSelection, setRadioSelection] = useState('');
  const [active, setActive] = useState("online");


  const handleRadioChange = (value: string) => {
    setRadioSelection(value);
    setcategory(value);
  };

  const formatDateTime = (dateTimeString: any) => {
    const optionsDate: any = { year: 'numeric', month: 'long', day: 'numeric' };
    const optionsTime: any = { hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    // const optionsTime: any = { hour: 'numeric', minute: 'numeric', second: 'numeric' };

    // const localDateTime = moment.utc(dateTimeString).local();

    const date = new Date(dateTimeString);
    const formattedDate = format(date, 'dd-MMMM-yyyy', optionsDate);
    const formattedTime = format(date, 'HH:mm:ss zzz', optionsTime);
    //   const formattedDate = date.toLocaleString('en-US', optionsDate);
    // const formattedTime = date.toLocaleString('en-US', optionsTime);

    return {
      date: formattedDate,
      time: formattedTime,
    };
  };


  const [screenLoading, setScreenLoading] = useState(true);

  useEffect(() => {
    setScreenLoading(true);
    setTimeout(() => {
      setScreenLoading(false);
    }, 2000);
  }, []);




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

    if (userData && userData?.role != "hr") {
      // alert("No User Found!")
      toast.error("No User Found!");
      router.push("/dashboards");
    }

    if (userData && userData.role == 'hr' && filteredVerifications[0]?.verified === "unverified") {
      toast.error("Please verify your account");
      router.push("/dashboards");
    }


  }, [userData, status, router, deletionStatus, submit]);

  const filterService = services?.filter((service: any) => service.user_id === userData?.id);

  //console.log("Filtered Service: " + filterService);

  //console.log("Total Service: " + filterService.length);

  const filteredVerifications = verification?.filter((item: any) => userData?.id === item?.user_id);
  const filteredInfo = hrTable?.filter((item: any) => userData?.id === item?.user_id);


  async function onClickApproveRequest() {
    try {
      const res = await fetch("/api/hr2", {
        method: 'PUT',
        body: JSON.stringify({ is_approve: "pending", user_id: userData?.id }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },

      })

      if (!res.ok) {
        // alert("Error submitting data")
        toast.error("Error submitting data");
        return;
      }

      toast.success("Account Approval request sent");
      window.location.reload();

    } catch (error) {
      //console.log(error);

    }
  }


  async function onClickDeleteSlot(id: any) {
    try {

      // //console.log("Slot: ", slot);
      // alert("Slot: " + slot);

      const data = await fetch("/api/getServices", {
        method: 'DELETE',
        body: JSON.stringify({ user_id: userData?.id, id: id }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },

      });
      setDeletionStatus((prevStatus) => !prevStatus);
      // alert("Slot Deleted!");
      toast.success("Slot Deleted!");
      window.location.reload();
      return data.json();
      // return {"message":"deleted"}
    } catch (error) {
      //console.log(error);
    }
  }


  // useEffect(() => {
  //   if (userData) {
  //     setId(userData?.id);
  //   }
  // }, [userData])

  // const formattedDate = selectedDate?.toISOString();

  // const slot = selectedDate ? moment(selectedDate).tz('Asia/Karachi').format() : '';
  //console.log("Date unformatted:, " + selectedDate);

  const slot = selectedDate ? moment.utc(selectedDate).format() : '';

  //console.log("Date Formatted: " + slot);


  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };



  async function onSubmit() {

    try {

      if (service.length === 0 || slot.length === 0 || category.length === 0) {
        toast.error("Please fill out all the required fields");
        return;
      }

      if (selectedDate && selectedDate < new Date()) {
        // alert("Selected slot is in the past. Please select a future slot.");
        toast.error("Selected slot is in the past. Please select a future slot.");
        return;
      }

      if (filterService.filter((item: any) => item.slot === slot).length > 0) {
        toast.error("Slot already exists");
        return;
    }
    

      //console.log("Form Data: ", service, slot, userData?.id);
      const res = await fetch("/api/getServices", {
        method: 'POST',
        body: JSON.stringify({ service, slot, user_id: userData?.id, category }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },

      })

      setSubmitStatus((prevStatus) => !prevStatus);
      setService("");
      setSelectedDate(null);
      if (!res.ok) {
        // alert("Error submitting Date!")
        toast.error("Error submitting Date!");
        return;
      }
      // alert("Services Submitted");
      toast.success("Services Submitted");
      window.location.reload();


      return res;
    } catch (error) {
      //console.log(error);

    }

  }

  return (

    <div className='w-full py-10'>

{screenLoading ? (
        <SpinnerLoader />
      ) :(
        <>
        {userData && userData.role == 'hr' && filteredVerifications[0]?.verified === "verified" ? (
        <div>

          {/* <NavBar /> */}
          <span className='font-nunito px-4  text-[24px] leading[30px] md:text-[30px] md:leading[39px] font-bold text-[#242E49]'>Services</span>

          <div className='flex  w-full bg-[#F5F6FA] justify-around flex-col md:flex-row h-screen mt-4'>


            {filteredInfo[0]?.is_approve === "approved" ? (
              <div className='flex flex-col w-full  items-center h-screen space-y-4'>

                {/* White Box */}

                {/* New One */}

                <div className='bg-white md:w-[96%]  rounded-[16px] mt-4 flex flex-col lg:flex-row mb-[30px]'>


                  <div className='flex flex-col px-8 py-6 w-[100%]'>
                    <div className='flex flex-col sm:flex-row gap-y-6 sm:space-x-6 '>
                      <div className='w-auto sm:w-[50%]'>
                        <label className="text-[#333333] text-[16px] font-be leading-[20px] font-semibold" htmlFor="service">
                          Service
                        </label>
                        <input
                          className="input py-2 px-4 bg-[#F2F5F9] rounded-xl w-full outline-none "
                          value={service} onChange={(e) => setService(e.target.value)} type="text" name="" id="service"
                          placeholder="Enter Service"
                        />
                      </div>
                      <div className='w-auto sm:w-[50%]'>
                        <label className="text-[#333333] text-[16px] font-be leading-[20px] font-semibold" htmlFor="date">
                          Date
                        </label>
                        <CalendarDateRangePicker onDateChange={handleDateChange} />
                      </div>
                    </div>

                    <div className="flex mt-6 mb-6 md:mb-0 space-x-6  justify-between">
                      <div className='flex gap-x-8'>
                        <div className="flex items-center gap-x-1">
                          {/* <input id="mock-interview" name="category" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" /> */}
                          <input
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            type="radio"
                            name="serviceRadio"
                            checked={radioSelection === 'mock'}
                            onChange={() => handleRadioChange('mock')}
                          />
                          <label htmlFor="mock-interview" className="block text-xs md:text-sm font-medium leading-6 text-gray-900">Mock interview</label>
                        </div>
                        <div className="flex items-center gap-x-1">
                          {/* <input id="job-interview" name="category" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" /> */}
                          <input
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            type="radio"
                            name="serviceRadio"
                            checked={radioSelection === 'job'}
                            onChange={() => handleRadioChange('job')}
                          />
                          <label htmlFor="job-interview" className="block text-xs md:text-sm font-medium leading-6 text-gray-900">Job interviews</label>
                        </div>
                      </div>


                      <Button className={`bg-[#4765FF]/95 hover:bg-[#4765FF] w-auto text-white font-be md:flex hidden leading-[20.38px] text-[14px]  px-2 py-1 sm:px-3 sm:py-2 rounded focus:outline-none focus:shadow-outline`} onClick={onSubmit} type="submit">SUBMIT NOW</Button>

                    </div>

                    <Button className={`bg-[#4765FF]/95 hover:bg-[#4765FF] w-auto text-white font-be flex md:hidden leading-[20.38px] text-[14px]  px-2 py-1 sm:px-3 sm:py-2 rounded focus:outline-none focus:shadow-outline`} onClick={onSubmit} type="submit">SUBMIT NOW</Button>

                  </div>
                </div>

                {/* All Slot List */}

                <div className='max-h-[350px] overflow-y-auto w-full px-6 '>

                  <span className='font-nunito text-[24px] leading[30px] md:text-[30px] md:leading[39px] font-bold text-[#242E49]'>All slots List</span>

                  <div className="flex flex-row my-4 space-x-4 items-center justify-start w-full">
                    <div>
                      <select value={active} onChange={(e) => setActive(e.target.value)} className='input py-3.5 px-4 bg-[#FFFFFF] shadow-md rounded-xl w-full outline-none' id='active'>
                        {/* <option value="">Select Status </option> */}
                        <option value="online">Online</option>
                        <option value="expired">Expire</option>
                      </select>
                    </div>

                  </div>

                  {
                    filterService
                    .filter(item => {
                      const currentTime = new Date();
                      const slotTime = new Date(item.slot);

                      if(active === "online")
                        {
                          return slotTime.getTime() >= currentTime.getTime();
                        }
                        else if(active === "expired")
                          {
                            return slotTime.getTime() < currentTime.getTime();
                          }
                          return true;
                    })
                    .map(item => (
                      <div key={item.id} className='bg-white font-be text-[#333333] rounded-[8px] grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3 lg:gap-y-0 lg:grid-cols-4 py-3 px-3 sm:py-4 sm:px-6 mt-4'>


                        <div className='flex flex-col px-2 gap-y-2 justify-start text-left'>
                          <div className='flex flex-col space-y-2'>
                            <span className='text-[20px] leading-[20px] font-semibold'>Service Name</span>
                            <span className='text-[17px] leading-[20px] '>{item?.service}</span>
                          </div>

                          <div className='flex flex-col space-y-2'>
                            <span className='text-[17px] leading-[20px] font-semibold'>Interview Category</span>
                            <span className='text-[14px] leading-[20px] '>{item?.category}</span>
                          </div>


                        </div>

                        <div className='flex flex-col px-2 gap-y-2 justify-start text-left'>
                          <span className='text-[14px] leading-[20px] text-[#6D6D6D]'>Date:</span>
                          <span className='text-[14px] leading-[20px] '>{formatDateTime(item.slot).date}</span>
                        </div>

                        <div className='flex flex-col px-2 gap-y-2 justify-start text-left'>
                          <span className='text-[14px] leading-[20px] text-[#6D6D6D]'>Time:</span>
                          <span className='text-[14px] leading-[20px] '>{formatDateTime(item.slot).time}</span>
                        </div>
                        <div className='flex flex-col px-2 gap-y-2 justify-start  text-left  '>
                          <button onClick={() => onClickDeleteSlot(item?.id)} className="px-3 w-[98px] lg:self-end py-2 bg-[#F43F5E] text-white rounded-[10px] shadow-md hover:bg-[#F43F5E]/90 transition-colors">
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                </div>



              </div>
            ) : (
              <div className='w-full'>
                <div className='flex items-center text-start justify-start w-full h-screen px-6'>
                  <div className='flex flex-col space-y-6 w-full px-4 bg-white rounded-xl shadow-md  h-[450px] md:h-[300px] items-center justify-center'>
                    <Alert className='border-4' variant="destructive">
                      <AlertCircle className="h-6 w-6" />
                      <AlertTitle className='font-bold text-2xl text-red-700'>Disclaimer</AlertTitle>
                      <AlertDescription className='font-bold text-xl text-black'>
                        Please complete your profile first and then send it for approval by clicking the button below
                      </AlertDescription>
                    </Alert>

                    {userData && userData?.role === 'hr' && filteredInfo[0]?.is_approve !== "approved" && (
                      <Button className='bg-[#4765FF] hover:bg-[#4765FF]/80 text-xs md:text-md  h-11 rounded-lg' disabled={filteredInfo[0]?.is_approve === "pending"} onClick={onClickApproveRequest} type="submit">{filteredInfo[0]?.is_approve === "pending" ? "Still in pending" : "Send Approve Request"}</Button>)}

                  </div>
                </div>
              </div>
            )}


          </div>
        </div>
      ) : (<SpinnerLoader />)}
        </>
      )}



      


    </div>
  )
}

export default ServiceInput