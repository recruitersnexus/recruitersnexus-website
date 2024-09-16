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

const ShareProf = () => {

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

    <div className='bg-white '>
      {userData && userData?.role == "hr" ? (
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
          {/* <NavBar /> */}

          <div className='w-full h-1/2  flex flex-col space-y-5 justify-center items-center'>

            <div className='bg-white p-8 rounded-lg '>
              <h1 className='font-bold text-3xl text-center text-black'>Share</h1>

              <div className='flex space-x-3'>
                <FacebookShareButton

                  url={process.env.NEXT_PUBLIC_Backend_URL + `/profile/${userData?.id}`} >
                  <FacebookIcon size={55} round />
                </FacebookShareButton>

                <WhatsappShareButton

                  url={process.env.NEXT_PUBLIC_Backend_URL + `profile/${userData?.id}`} >
                  <WhatsappIcon size={55} round />
                </WhatsappShareButton>
                <LinkedinShareButton

                  url={process.env.NEXT_PUBLIC_Backend_URL + `/profile/${userData?.id}`} >
                  <LinkedinIcon size={55} round />
                </LinkedinShareButton>


                <TwitterShareButton

                  url={process.env.NEXT_PUBLIC_Backend_URL + `/profile/${userData?.id}`} >
                  <TwitterIcon size={55} round />
                </TwitterShareButton>
              </div>
            </div>



          </div>
        </div>
      ) : (<SkeletonLoaderCustom />)}

    </div>


  )
}

export default ShareProf