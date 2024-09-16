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
import { X } from "lucide-react"
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";

const ProfessionalExperience = ({ data, id }: any) => {
	const { userData, status } = useUserData();
	const { verification } = VerificationData();
	const { qualification } = QualificationData();
	const { experience } = ExperienceData();
	const { hrTable } = HrData();
	const filteredVerifications = verification?.filter((item: any) => userData?.id === item?.user_id);

	async function onClickDelete(id: any) {
		try {

			// //console.log("Slot: ", slot);
			// alert("Slot: " + slot);

			const data = await fetch("/api/experience", {
				method: 'DELETE',
				body: JSON.stringify({ id: id, user_id: userData?.id }),
				headers: {
					"Content-type": "application/json; charset=UTF-8"
				},

			});
			//   setDeletionStatus((prevStatus) => !prevStatus);

			//   //console.log("Deletion status updated:", deletionStatus);
			//   setForceUpdate(prev => !prev); 

			//   alert("Skill Deleted!");
			toast.success("Experience Deleted");

			return data.json();
			// return {"message":"deleted"}
		} catch (error) {
			//console.log(error);
		}
	}


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


	//console.log("Verification: ", verification);
	const [check, setcheck] = useState("loading")

	//console.log("Experience data: ", experience);

	const filteredVerification = verification?.filter((item: any) => item.user_id === userData?.id);
	//console.log("Filtered Verification: ", filteredVerification[0]);
	const filteredExperience = experience?.filter((item: any) => item.user_id === id).reverse();
	const filteredQualificaton = qualification?.filter((item: any) => item.user_id === id);
	const filteredHrTable = hrTable?.filter((item: any) => item.user_id === id);
	//console.log("Experience Filtered: ", filteredExperience);
	//console.log("Id: ", id);




	const { title, experiences } = data;
	return (
		<section>

			<div>
				<h2 className='mb-6 font-bold'> {title}</h2>
				<div className='flex flex-col gap-6'>
					{filteredExperience?.map((item: any) => (
						<div key={item.id} className='flex flex-col rounded-lg'>
							<span className={`h-2 ${item.aoe ? "bg-[#68F590]" : "bg-[#F3F3F3]"}`} />
							<div className='bg-[#FAFAFA] p-6 drop-shadow-md'>
								<button disabled={filteredVerifications[0]?.verified === "unverified"} className={`${userData?.id === id ? "visible" : "hidden"} ${filteredVerifications[0]?.verified === "unverified" ? "cursor-not-allowed" : "visible"}}`} onClick={() => onClickDelete(item.id)}><Trash2 className="w-6 cursor-pointer hover:text-red-500 h-6 flex absolute top-0 right-0 mr-1 mt-1 " /></button>
								<h3 className="text-2xl">{item.designation}</h3>
								<p className='mt-2'>{item.organization}{" ("}{formatDateTime(item.from_date).date}{"  -  "}{formatDateTime(item.to_date).date}{") "}</p>
								<p className="mt-2"><b>Area of Expertise:</b>  {item.aoe}</p>
							</div>
						</div>
					))}
				</div>
			</div>


		</section>
	);
};

export default ProfessionalExperience;