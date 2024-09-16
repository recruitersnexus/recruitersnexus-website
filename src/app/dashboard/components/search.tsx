"use client"
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import useUserData from '@/lib/db/userData';
import { useRouter } from 'next/navigation';
import MainUsers from '@/lib/db/mainUsers';

// interface UserData {
//   id: string;
//   username: string;
//   email: string;
//   password: string;
//   image: string;
//   role: string;
//   createdAt: Date;
// }

// async function getData() {
//   try {
//     const data = await fetch('http://localhost:3000/api/users', {
//       method: 'GET',
//       cache: 'no-cache',
//       headers: {
//         'Content-type': 'application/json; charset=UTF-8',
//       },
//     });
//     return data.json();
//   } catch (error) {
//     //console.log(error);
//     return [];
//   }
// }

export function Search() {
  const { users } = MainUsers();
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  
  const userData = users;

  const handleInputChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  // Filter user accounts progressively based on the search term
  const filteredAccounts = searchTerm
    ? userData.filter((user) =>
        user.username.toLowerCase().startsWith(searchTerm.toLowerCase())
      )
    : [];

  // Redirect to the user profile when a filtered account is clicked
  const handleAccountClick = (userId: string) => {
    // Use the router.push method to navigate to the profile page
    router.push(`/profile/${userId}`);
  };

  

  // const [userData, setUserData] = useState<UserData[]>([]);
  // useEffect(() => {
  //   // Fetch data when the component mounts
  //   const fetchData = async () => {
  //     const userData = await getData();
  //     setUserData(userData);
  //   };

  //   fetchData();
  // }, []); // Empty dependency array to ensure the effect runs only once

  
  return (
    <div className="relative -z-1">
      <Input
        type="search"
        placeholder="Search..."
        className="md:w-[100px] lg:w-[300px] "
        value={searchTerm}
        onChange={handleInputChange}
      />

      {/* Render the filtered user accounts if userData is available */}
      {userData.length > 0 && searchTerm && (
        <div className="absolute top-full left-0 bg-[#242E49] border border-gray-600 mt-1 p-2 rounded-md">
          {filteredAccounts.length > 0 ? (
            filteredAccounts.map((user) => (
              <div
                key={user.id}
                onClick={() => handleAccountClick(user.id)}
                className="cursor-pointer p-2 bg-[#242E49] hover:bg-[#2D3748] rounded-md"
              >
                {user.username}
              </div>
            ))
          ) : (
            <div className="text-white">No users found</div>
          )}
        </div>
      )}
    </div>
  );
}
