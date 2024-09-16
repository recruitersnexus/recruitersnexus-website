"use client"
import React, { useId } from "react";
import Skills from "./Skills";
import HrData from "@/lib/db/hrData";
import MainUsers from "@/lib/db/mainUsers";
import SkeletonLoaderNavbar from "@/components/SkeletonLoaderNavbar";
import SkeletonLoaderCustom from "@/components/SkeletonLoaderCustom";

const AboutMe = ({ data, skills, newData ,skillsData, id }:any) => {
	const {hrTable} = HrData();
	const filteredHrTable = hrTable?.filter((item:any)=> item.user_id === id);
	const { users } = MainUsers();
	const filterUsers = users?.filter((item:any)=> item?.id === id);
	

	const { title, body } = data;
	// const id = useId();
	return (
		<section>
			<h2 className='mb-8 font-bold'> {title}</h2>
			{filteredHrTable?.map((item:any) => (
				<p key={item.id} className='mb-6' style={{ whiteSpace: "pre-line" }}>
					{item.about}
				</p>
			))}
			{/* {body?.map((el:any, i:any) => (
				<p key={`${id}_${i}`} className='mb-6'>
					{el}
				</p>
			))} */}
			{filterUsers && filterUsers[0]?.role === 'hr'?(
				<SkeletonLoaderNavbar/>
			):filterUsers[0]?.role === "user" || filterUsers[0]?.role === "admin" ?(
				<Skills  data={skills} newData={newData} skillsData={skillsData} id={id} />
			):<SkeletonLoaderCustom/>}
			
		</section>
	);
};

export default AboutMe;
    