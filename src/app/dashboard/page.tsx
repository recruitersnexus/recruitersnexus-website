import Dashboard from "./components/Dashboard";
// import newUserData from "@/lib/db/newUserData";



// const fetchData = async () => {
//   try {    
//     const response = await fetch(process.env.NEXT_PUBLIC_Backend_URL+"/api/users/me", {
//       method: 'GET',
//       headers: {
//         'Content-type': 'application/json; charset=UTF-8',
//       },
//     });

//     // if (!response.ok) {
//     //   throw new Error(`HTTP error! Status: ${response.status}`);
//     // }

//     // //console.log(response)
//     const newUser = await response.json();
//     // //console.log("JSON Data:", services);
//     return newUser.user;
//   }
//   catch (error) {
//     console.error("Error fetching user data:", error);
//     return "Error";
//   }
// };


export default async function DashboardPage() {
  // const newData:any = await newUserData();
  // const userData = await fetchData();
  // //console.log("User Data in page: " , userData);
  
    // //console.log("New Data: " , newData);
    
    



  return (
    
    <div>
      
     <Dashboard />
    </div>
  );
}
