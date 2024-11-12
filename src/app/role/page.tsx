import React from 'react'
import Role from './Role'
import bcryptjs from "bcryptjs";



// const getVerifyData = async () => {
//   try {
//     const response = await fetch("http://localhost:3000/api/verify", {
//       method: 'GET',
//       cache: 'no-cache',
//       headers: {
//         'Content-type': 'application/json; charset=UTF-8',
//       },
//     });

//     // if (!response.ok) {
//     //   throw new Error(`HTTP error! Status: ${response.status}`);
//     // }

//     // //console.log(response)
//     const services = await response.json();
//     // //console.log("JSON Data:", services);
//     return services;

//   } catch (error:any) {
//     console.error("Error fetching data:", error.message);
//     throw error; // Re-throw the error to propagate it to the calling code
//   }
// };


async function page() {

  // const storedRegCode = await getVerifyData();
  // const {reg_code} = storedRegCode;
  // const hashedStoredCode = await bcryptjs.hash(reg_code, salt);
  // //console.log("Stored Code: ", storedRegCode.reg_code);
  
  const salt = await bcryptjs.genSalt(10);
  const otp = Math.floor(100000 + Math.random() * 900000);
  const otpReg = Math.floor(100000 + Math.random() * 900000);
  const hashedForgotPassword = await bcryptjs.hash(otp.toString(), salt);
  const hashedRegistrationCode = await bcryptjs.hash(otpReg.toString(), salt);

  return (
    <div>
      <Role hashedRegistrationCode={hashedRegistrationCode}/>
    </div>
  )
}

export default page