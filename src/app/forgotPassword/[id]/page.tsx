import React from 'react'
import ForgotPassword from './ForgotPassword';

const page = ({params}:{params:any}) => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otp2 = Math.floor(100000 + Math.random() * 900000);
    //console.log(Math.floor(100000 + Math.random() * 900000));
  return (
    <div>
    {/* <h1>{otp}</h1>
    <h1>{otp2}</h1> */}
    <ForgotPassword id={params.id}/>
    </div>
  )
}

export default page