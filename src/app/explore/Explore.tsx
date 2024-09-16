"use client"
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RecentSales } from '../dashboard/components/recent-sales-user';
import { UserNav } from '../dashboard/components/user-nav'
import { MainNav } from '../dashboard/components/main-nav'
import { Search } from '../dashboard/components/search'
import NavBar from '../dashboard/components/NavBar';
import MainUsers from '@/lib/db/mainUsers';
import SkeletonLoaderCustom from '@/components/SkeletonLoaderCustom';

const Explore = () => {
  const {users} = MainUsers()
  const filteredHr = users?.filter((item: any) => item.role === "hr");
    return (
      <div>
          {users ? (<div className="grid gap-4 md:grid-cols-1  bg-[#F5F6FA] h-screen">
        <div className='bg-[#F5F6FA] w-full h-screen'>
          
    
          {/* <NavBar/> */} 

            <Card className="col-span-3 bg-[#F5F6FA] h-screen">
              <CardHeader>
                <CardTitle className='text-3xl text-[#242E49]'>Experts</CardTitle>
                <CardDescription className='text-md'>
                  Quailty experts here
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentSales />
              </CardContent>
            </Card>

          



        </div>
          </div>):(<SkeletonLoaderCustom/>)}
        </div>
      )
}

export default Explore