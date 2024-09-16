import { MainNav } from '@/app/dashboard/components/main-nav';
import { Search } from '@/app/dashboard/components/search';
import { UserNav } from '@/app/dashboard/components/user-nav';
import Image from 'next/image';
import React from 'react';
import { useEffect } from 'react';
import AboutMe from './AboutMe';
import { aboutMe, skills, professionalData, personalData, mySkills } from '../../../data/page-data';
import ProfessionalExperience from './ProfessionalExperience';
import Sidebar from './SideBar';
import { myDataHr } from '../../../data/page-data';

// import verificationData from '@/lib/db/vertificationData';
import NavBar from '@/app/dashboard/components/NavBar';

interface UserData {
  id: string;
  username: string;
  email: string;
  password: string;
  image: string;
  role: string;
  createdAt: Date;

  // Add other properties as needed
}

async function getData() {
  try {
    const data = await fetch(process.env.NEXT_PUBLIC_Backend_URL + '/api/hr2', {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    return data.json();
  } catch (error) {
    //console.log(error);
  }
}

async function getSkills() {
  try {
    const data = await fetch(process.env.NEXT_PUBLIC_Backend_URL + '/api/skills', {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    return data.json();
  } catch (error) {
    //console.log(error);
  }
}


async function fetchData() {
  try {
    const data = await fetch(process.env.NEXT_PUBLIC_Backend_URL + '/api/users/me', {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIsInVzZXJuYW1lIjoiQXphZCIsImVtYWlsIjoiYXphZEBnbWFpbC5jb20iLCJpbWFnZSI6bnVsbCwiaWF0IjoxNzAzNTExMjEyLCJleHAiOjE3MDM1OTc2MTJ9.ypDaPeFjwgKODg9MSC1XgTN1Xq0V5mEqjc8mN2q7me4",
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    //console.log("Data: " + data);

    return data.json();

  } catch (error) {
    //console.log(error);
  }
}

export default async function page({ params }: any) {
  const data: myDataHr[] = await getData();
  const skillsData: mySkills[] = await getSkills();
  const userData = await fetchData();

  const filteredData = data.filter((item) => item.user_id === params.id);
  //console.log("User ID: " + userData.id);
  //console.log("Params Id: " + params.id);

  return (
    <div>
      {filteredData.length > 0 ? (
        <div>
          {/* <div className="hidden flex-col md:flex">

            <div className="border-b">
              <div className="flex h-16 items-center px-4">
                <MainNav />
                <div className="ml-auto flex items-center space-x-4">
                  <Search />
                  <UserNav />
                </div>
              </div>
            </div>

          </div> */}
          <NavBar/>

          <div className={`flex flex-col sm:flex-row -z-1`}>
            <Sidebar className='-z-1' data={personalData} newData={filteredData} id={params.id} />

            <div className='grow-full p-8 sm:p-16 w-full sm:basis-2/3  ml-auto'>
              <AboutMe data={aboutMe} skills={skills} newData={filteredData} skillsData={skillsData} id={params.id} />
              <ProfessionalExperience data={professionalData} id={params.id} />
            </div>
          </div>
        </div>
      ) : (
        <div className='font-bold flex items-center justify-center h-screen'>
          <h1 className='text-black'>USER NOT FOUND!!</h1>
        </div>
      )}
    </div>
  );
}
