"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { userData } from "@/data/page-data";




const getUser = async ()=>{
  // //console.log("URL: ",process.env.Backend_URL);
  
    const res = await fetch(process.env.NEXT_PUBLIC_Backend_URL+"/api/users",{
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



const MainUsers = () => {

    const [users, setUsers] = useState<userData[]>([]);
  const UUID = uuidv4(); 
  const [status, setstatus] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUser();
        //console.log("Fetched Data:", data);
        setUsers(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return {users, UUID, status};
};


export default MainUsers;
