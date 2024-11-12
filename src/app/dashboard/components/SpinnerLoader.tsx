"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const SpinnerLoader = () => {


    return (
    <div className='absolute top-0 left-0 bg-white z-50 flex w-full h-screen justify-center items-center'>
    {/* <div classNameName='flex w-full md:h-screen h-[270px] justify-center items-center'> */}
        {/* <Image src={"/dual-ring-loader.gif"} width={100} height={100} alt='spinner' /> */}
        <div id="wifi-loader">
    <svg className="circle-outer" viewBox="0 0 86 86">
        <circle className="back" cx="43" cy="43" r="40"></circle>
        <circle className="front" cx="43" cy="43" r="40"></circle>
        <circle className="new" cx="43" cy="43" r="40"></circle>
    </svg>
    <svg className="circle-middle" viewBox="0 0 60 60">
        <circle className="back" cx="30" cy="30" r="27"></circle>
        <circle className="front" cx="30" cy="30" r="27"></circle>
    </svg>
    <svg className="circle-inner" viewBox="0 0 34 34">
        <circle className="back" cx="17" cy="17" r="14"></circle>
        <circle className="front" cx="17" cy="17" r="14"></circle>
    </svg>
    <div className="text" data-text="Loading..."></div>
</div>
    </div>
  )
}

export default SpinnerLoader