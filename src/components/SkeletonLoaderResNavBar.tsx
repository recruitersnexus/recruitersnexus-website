import React from "react";
import SkeletonLoader from "./SkeletonLoader";

const SkeletonLoaderResNavbar = () => {
  return (
    <div className="flex w-[300px] justify-around self-center md:justify-center items-center h-full">
      <SkeletonLoader className="flex flex-row md:flex-col w-full h-[50px] md:h-full space-y-0 md:space-y-6 self-center justify-around md:justify-center items-center">
        {/* Navbar */}

        <div className="hidden md:flex bg-gray-200 rounded-full self-center p-16"></div>
        <div className="hidden md:flex bg-gray-200 rounded-lg self-center p-6 md:py-6 md:px-24"></div>
        <div className="hidden md:flex bg-gray-200 rounded-lg self-center p-6 md:py-6 md:px-24"></div>

        <div className="flex flex-row md:flex-col w-full h-[100px] self-center md:h-full space-y-0 md:space-y-6 justify-around md:justify-center items-center">
          <div className="bg-gray-200 rounded-lg self-center p-6 md:py-6 md:px-24"></div>
          <div className="bg-gray-200 rounded-lg self-center p-6 md:py-6 md:px-24"></div>
          <div className="bg-gray-200 rounded-lg self-center p-6 md:py-6 md:px-24"></div>
          <div className="bg-gray-200 rounded-lg self-center p-6 md:py-6 md:px-24"></div>
        </div>
      </SkeletonLoader>
    </div>
  );
};

export default SkeletonLoaderResNavbar;
