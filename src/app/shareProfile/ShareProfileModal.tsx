"use client"
import React from 'react'
import {
  FacebookShareButton,
  FacebookIcon,
  PinterestShareButton,
  PinterestIcon,
  RedditShareButton,
  RedditIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon
} from 'next-share';
import { UserNav } from '../dashboard/components/user-nav';
import { Search } from '../dashboard/components/search';
import { MainNav } from '../dashboard/components/main-nav';
import useUserData from '@/lib/db/userData';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import SkeletonLoaderCustom from '@/components/SkeletonLoaderCustom';
import toast from 'react-hot-toast';
import NavBar from '../dashboard/components/NavBar';

const ShareProfileModal = () => {

  const { userData, UUID, status } = useUserData();
  const router = useRouter();


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

  }, [userData, status, router]);



  return (

    <div className='w-[250px] text-left  flex flex-col  justify-center items-center h-[120px] bg-white rounded-full'>
          

            <div className='p-5 space-y-6 flex flex-col justify-center items-left'>
              <h1 className='font-bold text-3xl  text-black'>Share Profile</h1>

              <div className='flex space-x-3'>

                <div className='bg-[#EBECEE] w-14 h-14 flex justify-center items-center rounded-xl'>
                <FacebookShareButton

                  url={process.env.NEXT_PUBLIC_Backend_URL + `/profile?id=${userData?.id}`} >
                  <FacebookIcon size={40} round />
                </FacebookShareButton>
                </div>


                <div className='bg-[#EBECEE] w-14 h-14 flex justify-center items-center rounded-xl'>
                <WhatsappShareButton

                  url={process.env.NEXT_PUBLIC_Backend_URL + `/profile?id=${userData?.id}`} >
                  <WhatsappIcon size={40} round />
                </WhatsappShareButton>
                </div>

                <div className='bg-[#EBECEE] w-14 h-14 flex justify-center items-center rounded-xl'>              
                <LinkedinShareButton

                  url={process.env.NEXT_PUBLIC_Backend_URL + `/profile?id=${userData?.id}`} >
                  <LinkedinIcon size={40} round />
                </LinkedinShareButton>
                </div>

                <div className='bg-[#EBECEE] w-14 h-14 flex justify-center items-center rounded-xl'>
                <TwitterShareButton

                  url={process.env.NEXT_PUBLIC_Backend_URL + `/profile?id=${userData?.id}`} >
                  <TwitterIcon size={40} round />
                </TwitterShareButton>
                </div>


                </div>
            



          </div>
        
      

    </div>


  )
}

export default ShareProfileModal