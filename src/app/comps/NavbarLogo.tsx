"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useUserData from "@/lib/db/userData";

export default function NavbarLogo() {
  const { userData } = useUserData();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setOpen(!open);
  };

  function handleRoute(path: string) {
    router.push(`/${path}`);
  }

  return (
    <>
      <header className="text-gray-600 body-font mb-0 sticky mx-auto z-[2] bg-[#242E49]">
        <div className="relative container flex flex-wrap p-4 mx-auto flex-row items-center justify-center text-white">
          <Link
            href="/"
            className=" flex title-font font-medium items-center pl-2 text-gray-900 mb-0"
          >
            <Image
              className=""
              height={120}
              width={120}
              src="/RN-new-white.png"
              alt="logo"
              priority
            />
          </Link>
          
        </div>
      </header>
    </>
  );
}
