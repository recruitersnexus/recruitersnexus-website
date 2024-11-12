"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { qualificationData } from "@/data/page-data";




const getQualificationData = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_Backend_URL+"/api/qualification", {
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
      const services = await response.json();
      // //console.log("JSON Data:", services);
      return services;
  
    } catch (error:any) {
      console.error("Error fetching data:", error.message);
      throw error; // Re-throw the error to propagate it to the calling code
    }
  };
  


const QualificationData = () => {
    const [qualification, setQualification] = useState<qualificationData[]>([]); 
  const UUID = uuidv4(); 
  const [status, setstatus] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getQualificationData();
        //console.log("Fetched Data:", data);
        setQualification(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return {qualification, UUID, status};
};


export default QualificationData;
