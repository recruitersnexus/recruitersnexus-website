"use client";
import React, { useState, useEffect } from 'react';
import useUserData from '@/lib/db/userData';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import ServiceData from '@/lib/db/serviceData';
import VerificationData from '@/lib/db/vertificationData';
import toast from 'react-hot-toast';
import HrData from '@/lib/db/hrData';
import { format } from 'date-fns';
import { AlertCircle } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import SpinnerLoader from '../dashboard/components/SpinnerLoader'


const ServiceInput = () => {
  const router = useRouter();
  const { userData, UUID, status } = useUserData();
  const [username, setUsername] = useState(`${userData?.username}`);
  const [service, setService] = useState("");
  const { services } = ServiceData();
  const [radioSelection, setRadioSelection] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setcategory] = useState("");
  const [screenLoading, setScreenLoading] = useState(true);
  const [deletionStatus, setDeletionStatus] = useState(false);
  const [submit, setSubmitStatus] = useState(false);
  const { verification } = VerificationData();
  const { hrTable } = HrData();
  const [active, setActive] = useState("online");
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

  useEffect(() => {
    setScreenLoading(true);
    setTimeout(() => {
      setScreenLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (status === "404") {
      toast.error("No User Found!");
      router.push("/login");
    }

    if (userData && userData?.role !== "hr") {
      toast.error("No User Found!");
      router.push("/dashboards");
    }
    if (userData && userData.role == 'hr' && filteredVerifications[0]?.verified === "unverified") {
      toast.error("Please verify your account");
      router.push("/dashboards");
    }

  }, [userData, status, router,  deletionStatus, submit]);
  const filterService = services?.filter((service: any) => service.user_id === userData?.id);

  //console.log("Filtered Service: " + filterService);

  //console.log("Total Service: " + filterService.length);

  const filteredVerifications = verification?.filter((item: any) => userData?.id === item?.user_id);
  const filteredInfo = hrTable?.filter((item: any) => userData?.id === item?.user_id);

  const handleRadioChange = (value: string) => {
    setRadioSelection(value);
    setcategory(value);
  };

  const handleDateChange = (dateString: string) => {
    const date = new Date(dateString); // Convert string to Date
    setSelectedDate(date);
  };

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
  };
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

  // Function to generate a random service name
  let interviewCounter = 1;

const generateRandomServiceName = () => {
  return `interview${interviewCounter++}`; 
};

  async function onSubmit() {
    const slotDate = selectedDate?.toISOString().split('T')[0];
  
    // Ensure all required fields are filled
    if (!selectedDate || !category || (radioSelection === 'mock' && (!startTime || !endTime || !duration)) || (radioSelection === 'job' && (!selectedTime || !service))) {
      toast.error("Please fill all the required fields.");
      return;
    }
  
    const selectedSlotDate = new Date(selectedDate);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set current time to midnight (start of the day)
  
    // Date validation: ensure the selected date is not in the past
    if (selectedSlotDate.getTime() < currentDate.getTime()) {
      toast.error("Selected date is in the past. Please select a future date.");
      return;
    }
  
    try {
      if (radioSelection === 'job') {
        const slotDateTime = new Date(`${slotDate}T${selectedTime}`);
  
        // Time validation: ensure the slot is not in the past
        if (slotDateTime < new Date()) {
          toast.error("Selected time is in the past. Please select a future time.");
          return;
        }
  
        // Submit job interview
        const res = await fetch("/api/getServices", {
          method: 'POST',
          body: JSON.stringify({ service, slot: slotDateTime.toISOString(), user_id: userData?.id, category }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          },
        });
  
        if (!res.ok) {
          const errorData = await res.json();
          console.error("Error response:", errorData);
          toast.error(`Error: ${errorData.message || "Error submitting data"}`);
          return;
        }
  
        toast.success("Job Interview slot created successfully");
        
        
      } else if (radioSelection === 'mock') {
        const date = selectedDate?.toISOString().split('T')[0];
        const start = new Date(`${date}T${startTime}`);
        const end = new Date(`${date}T${endTime}`);
        const durationInMinutes = parseInt(duration);
  
        // Time validation: ensure start time is before end time
        if (end <= start) {
          toast.error("End time must be after start time.");
          return;
        }
  
        let currentSlot = new Date(start);
        while (currentSlot < end) {
          const randomServiceName = generateRandomServiceName(); // Generate random service name
          const slotData = {
            service: randomServiceName, 
            slot: currentSlot.toISOString(),
            user_id: userData?.id,
            category,
          };
  
         
  
          const res = await fetch("/api/getServices", {
            method: 'POST',
            body: JSON.stringify(slotData),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            },
          });
  
          if (!res.ok) {
            const errorData = await res.json();
            console.error("Error response:", errorData);
            toast.error(`Error: ${errorData.message || "Error submitting data"}`);
            return;
          }
  
          currentSlot.setMinutes(currentSlot.getMinutes() + durationInMinutes); // Increment slot time
        }
  
        toast.success("Mock Interview slots created successfully");
      }
      
      // Reload the page after successful submission
      window.location.reload();
  
    } catch (error) {
      console.error("Error submitting:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      // Reset form fields
      setService("");
      setSelectedDate(null);
      setSelectedTime("");
      setStartTime("");
      setEndTime("");
      setDuration("");
      interviewCounter = 1; 

    }
  }
   
  return (
    <div className='w-full py-10'>
      {screenLoading ? (
        <SpinnerLoader />
      ) : (
        <>
          {userData && userData.role === 'hr' && filteredVerifications[0]?.verified === "verified" ? (
            <>
              <span className='font-nunito px-4 text-[24px] leading-[30px] md:text-[30px] md:leading-[39px] font-bold text-[#242E49]'>
                Services
              </span>
  
              <div className='flex w-full bg-[#F5F6FA] justify-around flex-col md:flex-row h-screen mt-4'>
              {filteredInfo[0]?.is_approve === "approved" ? (
                <div className='flex flex-col w-full items-center h-screen space-y-4'>
                  <div className='bg-white md:w-[96%] rounded-[16px] mt-4 flex flex-col mb-[30px]'>
                    <div className="px-8 py-6">
                      <h2 className='text-black mb-2'>Select Interview Type</h2>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex gap-6">
                          <div className="flex items-center gap-x-1">
                            <input
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              type="radio"
                              name="serviceRadio"
                              checked={radioSelection === 'mock'}
                              onChange={() => handleRadioChange('mock')}
                            />
                            <label className="block text-xs md:text-sm font-medium leading-6 text-gray-900">
                              Mock Interview
                            </label>
                          </div>
                          <div className="flex items-center gap-x-1">
                            <input
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              type="radio"
                              name="serviceRadio"
                              checked={radioSelection === 'job'}
                              onChange={() => handleRadioChange('job')}
                            />
                            <label className="block text-xs md:text-sm font-medium leading-6 text-gray-900">
                              Job Interview
                            </label>
                          </div>
                        </div>
  
                        <Button
                          className="bg-[#4765FF]/95 hover:bg-[#4765FF] w-auto text-white font-be hidden md:block leading-[20.38px] text-[14px] px-2 py-1 sm:px-3 sm:py-2 rounded focus:outline-none focus:shadow-outline"
                          onClick={onSubmit}
                          type="button"
                        >
                          SUBMIT NOW
                        </Button>
                      </div>
  
                      <Button
                        className="bg-[#4765FF]/95 hover:bg-[#4765FF] w-auto text-white font-be flex md:hidden leading-[20.38px] text-[14px] px-2 py-1 sm:px-3 sm:py-2 rounded focus:outline-none focus:shadow-outline"
                        onClick={onSubmit}
                        type="button"
                      >
                        SUBMIT NOW
                      </Button>
                    </div>
  
                    {/* Job Interview Fields */}
                    {radioSelection === 'job' && (
                      <div className='flex flex-col px-8 py-6'>
                        <input
                          type="text"
                          value={service}
                          onChange={(e) => setService(e.target.value)}
                          placeholder="Service Name"
                          className="mb-4 border p-2 rounded text-black"
                          required
                        />
                        <input
                          type="date"
                          onChange={(e) => handleDateChange(e.target.value)}
                          className="mb-4 border p-2 rounded text-black"
                          required
                        />
                        <input
                          type="time"
                          onChange={(e) => handleTimeChange(e.target.value)}
                          className="mb-4 border p-2 rounded text-black"
                          required
                        />
                      </div>
                    )}
  
                    {/* Mock Interview Fields */}
                    {radioSelection === 'mock' && (
                      <div className='flex flex-col px-8 py-6'>
                        <input
                          type="date"
                          onChange={(e) => handleDateChange(e.target.value)}
                          className="mb-4 border p-2 rounded text-black"
                          required
                        />
                        <label>Start Time:</label>
                        <input
                          type="time"
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          className="mb-4 border p-2 rounded text-black"
                          required
                        />
                        <label>End Time:</label>
                        <input
                          type="time"
                          value={endTime}
                          onChange={(e) => setEndTime(e.target.value)}
                          className="mb-4 border p-2 rounded text-black"
                          required
                        />
                        <label>Duration (minutes):</label>
                        <select
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                          className="mb-4 border p-2 rounded text-black"
                          required
                        >
                          <option value="" disabled>Select Duration</option>
                          <option value="10">10 mins</option>
                          <option value="15">15 mins</option>
                          <option value="20">20 mins</option>
                        </select>
                      </div>
                    )}
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
                          <AlertTitle className='font-bold text-2xl'>Disclaimer</AlertTitle>
                          <AlertDescription className='font-bold text-xl'>
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
            </>
          ) : (
            <SpinnerLoader />
          )}
        </>
      )}
    </div>
  );
  
};

export default ServiceInput;
