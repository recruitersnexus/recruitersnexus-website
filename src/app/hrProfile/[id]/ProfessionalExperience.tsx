"use client"
import React from "react";
import VerificationData from "@/lib/db/vertificationData";
import useUserData from "@/lib/db/userData";
import { useState } from "react";
import QualificationData from "@/lib/db/qualificationData";
import ExperienceData from "@/lib/db/experienceData";
import { format } from 'date-fns';
import SkeletonLoaderCustom from "@/components/SkeletonLoaderCustom";
import { useEffect } from "react";
import HrData from "@/lib/db/hrData";

const ProfessionalExperience = ({ data,id }:any) => {
	const {userData,status} = useUserData();
	const {verification} = VerificationData();
	const {qualification} = QualificationData();
	const {experience} = ExperienceData();
	const {hrTable} = HrData();

	const formatDateTime = (dateTimeString: any) => {
		const optionsDate: any = { year: 'numeric', month: 'long', day: 'numeric' };
		const optionsTime: any = { hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
	  
		const date = new Date(dateTimeString);
		const formattedDate = format(date, 'MMMM-yyyy', optionsDate);
		const formattedTime = format(date, 'HH:mm:ss zzz', optionsTime);
	  
		return {
		  date: formattedDate,
		  time: formattedTime,
		};
	  };
	

	//console.log("Verification: ",verification);
	const [check, setcheck] = useState("loading")

	//console.log("Experience data: ",experience);
	
	const filteredVerification = verification?.filter((item:any) => item.user_id === userData?.id);
	//console.log("Filtered Verification: ",filteredVerification[0]);
	const filteredExperience = experience?.filter((item:any) => item.user_id === id);
	const filteredQualificaton = qualification?.filter((item:any) => item.user_id === id);
	const filteredHrTable = hrTable?.filter((item:any)=> item.user_id === id);
	//console.log("Experience Filtered: ",filteredExperience);
	//console.log("Id: ",id);
	
	
	

	const { title, experiences } = data;
	return (
		<section>
			{filteredVerification[0]?.verified === "verified"?(
			<div>
			<h2 className='mb-6'> {title}</h2>
			<div className='flex flex-col gap-6'>
				{filteredExperience?.map((item:any) => (
					<div key={item.id} className='flex flex-col rounded-lg'>
						<span className={`h-2 ${item.aoe ? "bg-[#68F590]" : "bg-[#F3F3F3]"}`} />
						<div className='bg-[#FAFAFA] p-6 drop-shadow-md'>
							<h3>{item.designation}</h3>
							<p className='mt-2'>{item.organization}{" ("}{formatDateTime(item.from_date).date}{"  -  "}{formatDateTime(item.to_date).date}{") "}</p>
						</div>
					</div>
				))}
			</div>
			</div>
			): filteredVerification[0]?.verified === "unverified" &&(<div className="flex justify-center items-center h-screen w-full">
				<h1>Please Verify your account to see following content</h1>
			</div>)}
			
		</section>
	);
};

export default ProfessionalExperience;