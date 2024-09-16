"use client"
import React, { useId } from "react";
import Skills from "./Skills";
import HrData from "@/lib/db/hrData";

const AboutMe = ({ data, skills, newData ,skillsData, id }:any) => {
	const {hrTable} = HrData();
	const filteredHrTable = hrTable?.filter((item:any)=> item.user_id === id);

	const { title, body } = data;
	// const id = useId();
	return (
		<section>
			<h2 className='mb-8'> {title}</h2>
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
			<Skills data={skills} newData={newData} skillsData={skillsData} id={id} />
		</section>
	);
};

export default AboutMe;
    