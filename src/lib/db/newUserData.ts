// import { NextResponse } from "next/server";
// import { v4 as uuidv4 } from 'uuid';
// import Cookies from 'js-cookie';

// interface UserData {
//   id: string;
//   username: string;
//   email: string;
//   password: string;
//   image: string;
//   role: string;
//   createdAt: Date;
//   // Add other properties as needed
// }

// const newUserData = async (): Promise<UserData | "Error"> => {
//   const UUID = uuidv4();  

//   try {
//     const token = Cookies.get('JwtToken');
//     //console.log("JWT Token: ", token);
    
//     const response = await fetch("http://localhost:3000/api/users/me", {
//       method: 'GET',
//       headers: {
//         'Content-type': 'application/json; charset=UTF-8',
//         // Include your JWT token in the headers if required
//         // 'Authorization': `Bearer ${token}`
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const userData: UserData = await response.json();
//     return userData;
//   } catch (error) {
//     console.error("Error fetching user data:", error);
//     return "Error";
//   }
// };

// export default newUserData;
