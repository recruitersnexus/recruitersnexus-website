"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { myInterview } from "@/data/page-data";




async function getInterviews() {
    try {
      const data = await fetch(process.env.NEXT_PUBLIC_Backend_URL+'/api/interview', {
        method: 'GET',
        cache: 'no-cache',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      return data.json();
    } catch (error) {
      //console.log(error);
    }
  }
  


const InterviewData = () => {

    const [interviews, setInterviews] = useState<myInterview[]>([]);  
  const UUID = uuidv4(); 
  const [status, setstatus] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getInterviews();
      setInterviews(data);
    };

    fetchData();
  }, []);

  return {interviews, UUID, status};
};


export default InterviewData;
