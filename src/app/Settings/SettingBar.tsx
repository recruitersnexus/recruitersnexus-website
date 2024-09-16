"use client"
import { useRouter } from 'next/navigation';
import React from 'react'




const SettingBar = () => {

    const router = useRouter();

    async function onClick(path:any)
{   router.push(`/Settings/${path}`);
    return;
}

  return (
    <div className='flex flex-col gap-4'>
          <button onClick={() => onClick('userinfo')}  className='w-full bg-[#242E49] p-4 hover:bg-[#242E49]/80  text-white shadow-xl'>User Info</button>
          <button onClick={() => onClick('qualifications')} className='w-full bg-[#242E49] p-4 hover:bg-[#242E49]/80  text-white shadow-xl'>Qualification</button>
          <button onClick={() => onClick('experience')} className='w-full bg-[#242E49] p-4 hover:bg-[#242E49]/80  text-white shadow-lg'>Experiences</button>
  </div>
  )
}

export default SettingBar