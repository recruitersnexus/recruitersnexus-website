import React from 'react'
import ChangePassword from './ChangePassword'
import bcryptjs from "bcryptjs";
import { Backend_URL } from '@/lib/Constants';

const getUser = async ()=>{
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

const getVerifyData = async () => {
try {
  const response = await fetch(process.env.NEXT_PUBLIC_Backend_URL+"/api/verify", {
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



const page = async({params}:{params:any}) => {
  const userData = await getUser(); 
  const verifyData = await getVerifyData();
  const salt = await bcryptjs.genSalt(10);
  // const filteredUser = userData.filter((user:any) => user.id === params.id);
  const filteredVerify = verifyData.filter((item:any)=> item.user_id === params.id)  
  // const hashedForgotCode = await bcryptjs.hash(filteredVerify[0]?.forgot_pass, salt);
  // //console.log("Hashed Forgot Code: ",hashedForgotCode);
  //console.log("Hashed Forgot Code: ",filteredVerify[0]?.forgot_pass);
  
  return (
    <div><ChangePassword id={params.id} forgot_pass={filteredVerify[0]?.forgot_pass}/></div>
  )
}

export default page