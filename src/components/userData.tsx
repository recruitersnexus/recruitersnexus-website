'use client'
import { Backend_URL } from '@/lib/Constants';
import { useSession } from 'next-auth/react'
import React from 'react'

const UserData = () => {
    const {data: session} = useSession()
    //console.log(session?.user)
    // //console.log({session})
    //   const register = async () => {
    //     const res = await fetch(Backend_URL + "/api/users/test", {
    //       method: "POST",
    //       body: JSON.stringify({
    //         username: session?.user?.name,
    //         email: session?.user?.email,
    //         image: session?.user?.image,
    //       }),
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     });
    //     if (!res.ok) {
    //       alert(res.statusText);
    //       return;
    //     }
    //     const response = await res.json();
    //     alert("User Registered!");
    //     //console.log({ response });
    //   };
    //   if (session && session.user){

    //   register()
    // }
  return (
    <div>
        <h3 className='text-red-600'>User Session Here</h3>
        <h1>
        {session?.user?.name}
        <br />
        {/* {session?.customToken} */}
        </h1>
        <h1>
        {session?.user?.email}
        </h1>
        {/* <img src={session?.user?.image}/> */}
    </div>
  )
}

export default UserData