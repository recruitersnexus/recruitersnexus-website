"use client"
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UnconductedHR } from './UnconductedHR';
import ConductedHR from './ConductedHR';
import useUserData from '@/lib/db/userData';
import UnconductedUSER from './UnconductedUSER';
import ConductedUSER from './ConductedUSER';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import SkeletonLoaderCustom from '@/components/SkeletonLoaderCustom';
import SpinnerLoader from './SpinnerLoader';

const Interviews = () => {
const router = useRouter();
const {userData, status} = useUserData();   


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

  // if (userData && userData?.role !== 'admin') {
  //     // alert("No User Found!");
  //     toast.error("Not Allowed!");
  //     router.push("/dashboards");
  // }


}, [userData, status, router]);


  return (
    <div className='bg-[#F5F6FA] h-screen  mt-8 px-[12px] md:px-4'>

    {screenLoading ? (
        <SpinnerLoader />
      ) :(

        <>
        {userData && (<div>
      <Tabs defaultValue="notConducted" className="space-y-8 md:space-y-4 bg-[#F5F6FA] ">
          <TabsList className='flex bg-[#F5F6FA] w-full  space-x-4  flex-row items-start  justify-end'>
            <TabsTrigger className='data-[state=active]:bg-[#242E49] data-[state=active]:text-white w-56 py-3 text-xs md:text-md bg-white shadow-lg ' value="notConducted">Not-Conducted</TabsTrigger>

            <TabsTrigger className='data-[state=active]:bg-[#242E49] data-[state=active]:text-white w-56 py-3 text-xs md:text-md bg-white shadow-lg ' value="conducted" >
              Conducted
            </TabsTrigger>


          </TabsList>

          <TabsContent value="notConducted" className="">

            {userData?.role === "hr"?(
                <UnconductedHR/>
            ): userData?.role === "user" && (<UnconductedUSER/>)}

          </TabsContent>


          <TabsContent value="conducted" className="">
            
            {userData?.role === "hr"?(
              <ConductedHR/>
            ): userData?.role === "user" && (<ConductedUSER/>) }

          </TabsContent>




          </Tabs>
    </div>)}
        </>

      )};

    




    </div>
  )
}

export default Interviews