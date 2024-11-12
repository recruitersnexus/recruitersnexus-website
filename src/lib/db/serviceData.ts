"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { serviceData } from "@/data/page-data";




const getServiceData = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_Backend_URL+"/api/getServices", {
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
  


const ServiceData = () => {
    const [services, setServices] = useState<serviceData[]>([]); 
  const UUID = uuidv4(); 
  const [status, setstatus] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getServiceData();
        //console.log("Fetched Data:", data);
        setServices(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return {services, UUID, status};
};


export default ServiceData;
