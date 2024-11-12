import React from 'react'
import SkeletonLoader from './SkeletonLoader'

const SkeletonLoaderNavbar = () => {
  return (
    <div className='flex w-full justify-around   items-center h-full'>
        <SkeletonLoader className="flex flex-row  w-full h-[100px]  space-y-0  self-center justify-around  items-center">
  {/* Navbar */}

    {/* <div className='hidden md:flex bg-gray-200 rounded-full self-center p-16'></div> */}

    <div className='flex flex-row  w-full h-[100px] self-center space-y-0  justify-around  items-center'>
  <div className="bg-gray-200 rounded-lg self-center p-6 "></div>
  <div className="bg-gray-200 rounded-lg self-center p-6 "></div>
  <div className="bg-gray-200 rounded-lg self-center p-6 "></div>
  <div className="bg-gray-200 rounded-lg self-center p-6 "></div>
  </div>

</SkeletonLoader>
    </div>
  )
}

export default SkeletonLoaderNavbar