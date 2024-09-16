"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { myDataHr } from "@/data/page-data";




const getHrTable = async ()=>{
    const res = await fetch(process.env.NEXT_PUBLIC_Backend_URL+"/api/hr2",{
        method: 'GET',
              cache: 'no-cache',
              headers: {
                'Content-type': 'application/json; charset=UTF-8'
              }
      }
    )
    const hr = await res.json();
    return hr;
  }
  



const HrData = () => {

const [hrTable, setHrTable] = useState<myDataHr[]>([]);
  const UUID = uuidv4(); 
  const [status, setstatus] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHrTable();
        //console.log("Fetched Data:", data);
        setHrTable(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []); 
  return {hrTable, UUID, status};
};


export default HrData;
