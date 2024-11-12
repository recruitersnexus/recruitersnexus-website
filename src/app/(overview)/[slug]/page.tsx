
import Experience from '@/app/Settings/Experience'
import Qualifications from '@/app/Settings/Qualifications'
import SettingBar from '@/app/Settings/SettingBar'
import UserInfo from '@/app/Settings/UserInfo'
import NavBar from '@/app/dashboard/components/NavBar'
import React from 'react'
import SideBar from '../SideBar'
import Dashboard from '@/app/dashboard/components/Dashboard'
import Explore from '@/app/explore/Explore'
import ServiceInput from '@/app/subServices/ServiceInput'
import { UnconductedHR } from '@/app/dashboard/components/UnconductedHR'
import Interviews from '@/app/dashboard/components/Interviews'
import Posting from '@/app/dashboard/components/Posting'
import Notifications from '@/app/dashboard/components/Notifications'
import Setting from '@/app/dashboard/components/Setting'
import JobUser from '@/app/dashboard/components/JobUser'
// import { useSearchParams } from 'next/navigation'
import { userData } from '@/data/page-data';
import Schedule from '@/app/schedule_interview/[id]/Schedule'
import ScheduleInterview from '@/app/dashboard/components/ScheduleInterview'
import Profile from '@/app/dashboard/components/Profile'
import Overview from './Overview'



async function getHrData() {
  try {
    const data = await fetch(process.env.NEXT_PUBLIC_Backend_URL + '/api/users', {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    return data.json();
  } catch (error) {
    // //console.log(error);
  }
}

async function getInterviews() {
  try {
    const data = await fetch(process.env.NEXT_PUBLIC_Backend_URL + '/api/interview', {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    return data.json();
  } catch (error) {
    // //console.log(error);
  }
}




const getServiceData = async () => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_Backend_URL + "/api/getServices", {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    // if (!response.ok) {
    //   throw new Error(`HTTP error! Status: ${response.status}`);
    // }

    // //console.log(response)
    const services = await response.json();
    // //console.log("JSON Data:", services);

    return services;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    throw error; // Re-throw the error to propagate it to the calling code
  }
};



const page = async({params, searchParams}:{params:any, searchParams?: { [key: string]: string | string[] | undefined }}) => {
  // const searchParams = useSearchParams();

  const id = searchParams?.id;

  
  const hrData: userData[] = await getHrData();
  const hrService = await getServiceData();
  const allInterviews = await getInterviews();

 
  const filteredHr = hrData?.filter((item: any) => item?.id === id);
  const filterServices = hrService.filter((item: any) => item?.user_id === id);

  //console.log("Id from Params into overview page: ", id);
  // //console.log("Information from Params into overview page: ", filteredHr[0]);
  // //console.log("services from Params into overview page: ", filterServices[0]);




  return (
    <div>
    <Overview slug={params.slug} id={id} filteredHr={filteredHr} filterServices={filterServices} allInterviews={allInterviews}/>
    </div>
  )
}

export default page