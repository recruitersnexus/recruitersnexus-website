import React from 'react'
import { Button } from '@/components/Button'
import Confirmation from '../Confirmation'

function page({params}:any) {
  return (
    <div className='flex items-center justify-center h-screen w-full bg-[#F2F5F9]'>
        <Confirmation id={params.id}/>
    </div>
  )
}

export default page