"use client";
import React, { useState } from "react";
import { X } from "lucide-react";
import useUserData from "@/lib/db/userData";
import { Pen } from "lucide-react";
import { useEffect } from "react";
import { mySkills } from "@/data/page-data";
import { Button } from "@/components/Button";
import VerificationData from "@/lib/db/vertificationData";
import toast from "react-hot-toast";

interface UserSkills {
    username: string;
    skills: string[]; // Assuming skills is an array of strings
}

// const [timestamp, setTimestamp] = useState(Date.now());

const Modal = ({ onClose }: { onClose: () => void }) => {
	const {userData} = useUserData();
	const {verification} = VerificationData();
	const filteredVerifications = verification?.filter((item:any)=>userData?.id === item?.user_id);
	const [skill, setSkill] = useState("")
	

	async function onAddSkill() {
		try {
		  const res = await fetch("/api/skills", {
			method: 'POST',
			body: JSON.stringify({ skill:skill,user_id:userData?.id }),
			headers: {
			  "Content-type": "application/json; charset=UTF-8"
			}
		  })
		  if(!res.ok)
		  {
			// alert("Error submitting skills");
			toast.error("Error submitting skills");
			return;
		  }
		//   setTimestamp(Date.now());
		  setSkill("");
		//   alert("Skill added successfully");
		toast.success("Skill Submitted");
		  return res;
		}
		catch (error) {
		  //console.log(error);
		}
	  }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                
                <button  className={`close-button`} onClick={onClose}><X/></button>
                <input type="text" placeholder="Enter skill..." value={skill} onChange={(e) => setSkill(e.target.value)} id='skill' />
				<Button className='bg-yellow-600 hover:bg-yellow-700 px-4 py-2 text-white font-bold shadow-lg' onClick={onAddSkill} type='submit'>Add Skill</Button>
            </div>
        </div>
    );
};



const Skills = ({ data, skillsData, newData, id }: any) => {
	const { userData } = useUserData();
	const [deletionStatus, setDeletionStatus] = useState(false);
	// const [userSkills, setUserSkills] = useState<UserSkills | null>(null);
	const [forceUpdate, setForceUpdate] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const {verification} = VerificationData();
	const filteredVerifications = verification?.filter((item:any)=>userData?.id === item?.user_id);

	

	// useEffect(() => {
        // Filter user skills based on the current user id
        // const filteredSkills = newData
        //     .filter((dataKey: any) => dataKey.user_id === id)
        //     .map((dataKey: any) => {
			const userSkills = newData
			.filter((dataKey: any) => dataKey.user_id === id)
			.map((dataKey: any) => {
			  const userSkillsData = skillsData
				.filter((key: any) => key.user_id === dataKey.user_id)
				.map((key: any) => key.skill);
		
			  return { username: dataKey.username, skills: userSkillsData };
			})[0]; 

        // setUserSkills(filteredSkills);
    // }, [userSkills,deletionStatus]);


	async function onClickDelete(skill:any)
	{
		try {
        
			// //console.log("Slot: ", slot);
			// alert("Slot: " + slot);
			
			const data = await fetch("/api/skills",{
			  method: 'DELETE',
			  body: JSON.stringify({ skill:skill,user_id:userData?.id }),
			  headers: {
				  "Content-type": "application/json; charset=UTF-8"
			  },
			  
		  });
		  setDeletionStatus((prevStatus) => !prevStatus);
		  
		  //console.log("Deletion status updated:", deletionStatus);
		  setForceUpdate(prev => !prev); 
		  
		//   alert("Skill Deleted!");
		toast.error("Skill Deleted");

			return data.json();
			// return {"message":"deleted"}
		  } catch (error) {
			//console.log(error);
		  }
	}

	useEffect(() => {
        //console.log("Deletion status updated:", deletionStatus);
    }, [deletionStatus]);
  
	const tabs = (
	  <div className={`flex ${userData?.role != "hr" ? "" : "hidden"}`}>
		<h1 className="text-4xl sm:text-6xl w-full flex justify-between bg-[#FFFF00] h-1/2 px-5 text-black"><span>Skills</span> <button disabled={filteredVerifications[0]?.verified === "unverified" } onClick={() => setShowModal(true)} ><Pen className={`${userData?.id === id ? "visible" : "hidden"}  ${filteredVerifications[0]?.verified === "unverified"?"cursor-not-allowed":"visible"} h-5 w-5 self-center cursor-pointer hover:text-green-500`} /></button></h1>
		
	  </div>
	);
  
	const content = (
	  <ul className="flex flex-row flex-wrap content-start list-none py-4 gap-2 justify-start">
		{userSkills &&
		  userSkills.skills.map((skill: any, index: number) => (
			<li key={index} className="skill relative">
			  <button disabled={filteredVerifications[0]?.verified === "unverified"} className={`${userData?.id === id ? "visible" : "hidden"} ${filteredVerifications[0]?.verified === "unverified" ? "cursor-not-allowed" : "visible"}}`} onClick={()=>onClickDelete(skill)}><X className="w-3 cursor-pointer hover:text-red-500 h-3 flex absolute top-0 right-0 mr-1 mt-1 " /></button>
			  <span>{skill}</span>
			</li>
		  ))}
	  </ul>
	);
  
	return (
	  <div key={deletionStatus ? "1" : "0"}>
		{tabs}
		{content}
		{showModal && <Modal onClose={() => setShowModal(false)} />}
	  </div>
	);
  };
  

export default Skills;