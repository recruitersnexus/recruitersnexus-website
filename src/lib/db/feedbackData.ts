"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { feedbackData } from "@/data/page-data";




async function getFeedback() {
    try {
      const data = await fetch(process.env.NEXT_PUBLIC_Backend_URL+'/api/feedback', {
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
  


const FeedbackData = () => {

    const [feedback, setFeedback] = useState<feedbackData[]>([]);  
  const UUID = uuidv4(); 
  const [status, setstatus] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFeedback();
      setFeedback(data);
    };

    fetchData();
  }, []);

  return {feedback, UUID, status};
};


export default FeedbackData;
