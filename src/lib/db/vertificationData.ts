"use client";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { verifyData } from "@/data/page-data";





  const getVerifyData = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_Backend_URL+"/api/verify", {
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




const VerificationData = () => {

const [verification, setVerification] = useState<verifyData[]>([]);
  const UUID = uuidv4(); 
  const [status, setstatus] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getVerifyData();
        //console.log("Fetched Data:", data);
        setVerification(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); 
  return {verification, UUID, status};
};


export default VerificationData;
