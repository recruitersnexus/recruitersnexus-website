"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { myReportsData } from "@/data/page-data";




const getReportedAccounts = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_Backend_URL+"/api/reports", {
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
      const reports = await response.json();
      // //console.log("JSON Data:", services);
      return reports;
  
    } catch (error:any) {
      console.error("Error fetching data:", error.message);
      throw error; // Re-throw the error to propagate it to the calling code
    }
  };
  


const ReportsData = () => {
    const [reports, setReports] = useState<myReportsData[]>([]); 
  const UUID = uuidv4(); 
  const [status, setstatus] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getReportedAccounts();
        //console.log("Fetched Data:", data);
        setReports(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return {reports, UUID, status};
};


export default ReportsData;
