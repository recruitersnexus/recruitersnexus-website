"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { myJobs } from "@/data/page-data";




const getJobs = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_Backend_URL+"/api/job", {
        method: 'GET',
        cache: 'no-cache',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
  
      // if (!response.ok) {
      //   throw new Error(`HTTP error! Status: ${response.status}`);
      // }
  
      // //console.log(response)
      const jobs = await response.json();
      // //console.log("JSON Data:", services);
      return jobs;
  
    } catch (error:any) {
      console.error("Error fetching data:", error.message);
      throw error; // Re-throw the error to propagate it to the calling code
    }
  };
  


const JobData = () => {
    const [jobs, setJobs] = useState<myJobs[]>([]); 
  const UUID = uuidv4(); 
  const [status, setstatus] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getJobs();
        //console.log("Fetched Data:", data);
        setJobs(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return {jobs, UUID, status};
};


export default JobData;
