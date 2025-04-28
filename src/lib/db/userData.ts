"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

interface UserData {
  id: string;
  username: string;
  email: string;
  password: string;
  image: string;
  role: string;
  plan: string;
  createdAt: Date;

  // Add other properties as needed
}

const useUserData = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const UUID = uuidv4();
  const [status, setstatus] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_Backend_URL + "/api/users/me"
        );

        setUserData(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setstatus("404");
      }
    };

    fetchData();
  }, []);
  return { userData, UUID, status };
};

export default useUserData;
