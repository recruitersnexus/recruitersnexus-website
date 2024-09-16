"use client";

import useUserData from "@/lib/db/userData";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardHR from "./DashboardHR";
import DashboardUser from "./DashboardUser";
import SkeletonLoader from "@/components/SkeletonLoader";
import DashboardAdmin from "./DashboardAdmin";
import toast from "react-hot-toast";
import SpinnerLoader from "./SpinnerLoader";

// import newUserData from "@/lib/db/newUserData";

type Props = {
  params: {
    id: string;
  };
};

export default function Dashboard() {
  const { userData, UUID, status } = useUserData();
  const router = useRouter();
  const [loading, setLoading] = useState(true);


  const [screenLoading, setScreenLoading] = useState(true);

  useEffect(() => {
    setScreenLoading(true);
    setTimeout(() => {
      setScreenLoading(false);
    }, 2000);
  }, []);


  useEffect(() => {
    // Check if there is no user data (e.g., user logged out)
    if (status === "404") {
      // //console.log("No user data found.");
      // //console.log("Status: " + status);
      // alert("No User Found!");
      toast.error("No User Found!");
      // //console.log("NO user Found!");
      router.push("/login");
    }

    // Once the data is fetched, set loading to false
    if (userData) {
      // //console.log("Status: " + status);
      setLoading(false);

      // Check if the user role is invalid
      if (
        userData.role !== "hr" &&
        userData.role !== "user" &&
        userData.role !== "admin"
      ) {
        // //console.log("Email: " + userData.email + " Role: " + userData.role);
        router.push("/role");
      }
    }
  }, [userData, status, router]);

  // //console.log("newData in Component: ", newData);
  // useEffect(() => {
  //   // Skip the initial render
  //   // if (loading) {
  //   //   return;
  //   // }
  //   //console.log("Status: " + status);

  //   if (userData && userData?.role != "hr" && userData?.role != "user") {
  //     //console.log("Email: " + userData?.email + " Role: " + userData?.role);
  //     router.push("/role");
  //   }

  //   // Check if there is no user data (e.g., user logged out)
  //   if (status === "404") {
  //     //console.log("No user data found.");
  //     //console.log("Status: " + status);

  //     alert("No User Found!");
  //     //console.log("NO user Found!");
  //     router.push("/logintest");
  //   }
  // }, [userData, status]);

  // useEffect(() => {
  //   // Once the data is fetched, set loading to false
  //   if (userData) {
  //     //console.log("Status: " + status);

  //     setLoading(false);
  //   }
  // }, [userData]);

  return (
    <div>
      {screenLoading ? (
        <SpinnerLoader />
      ) : (

        <>
          {userData?.role === "hr" ? (
            <DashboardHR />
          ) : userData?.role === "user" ? (
            <DashboardUser />
          ) : userData?.role === "admin" && (
            <DashboardAdmin />
          )}
        </>

      )}


    </div>
  );
}
