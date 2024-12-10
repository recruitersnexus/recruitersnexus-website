"use client";
import React, { useState, useEffect } from "react";
import { UserNav } from "@/app/dashboard/components/user-nav";
import Link from "next/link";
import { Bell, Share2 } from "lucide-react";
import Image from "next/image";
import useUserData from "@/lib/db/userData";
import InterviewData from "@/lib/db/interviewData";
import MainUsers from "@/lib/db/mainUsers";
import HrData from "@/lib/db/hrData";
import ShareProfileModal from "@/app/shareProfile/ShareProfileModal";
import SkeletonLoaderResNavbar from "@/components/SkeletonLoaderResNavBar";
import { useRouter, usePathname } from "next/navigation";

const Modal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center">
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75"
        onClick={onClose}
      ></div>
      <div className="bg-white p-8 rounded-3xl max-w-md relative z-20">
        <ShareProfileModal />
      </div>
    </div>
  );
};

const NavBar = () => {
  const [showModal, setShowModal] = useState(false);
  const [bell, setBell] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const [hrNotificationsCount, setHrNotificationsCount] = useState(0);
  const { userData } = useUserData();
  const { interviews } = InterviewData();
  const { users } = MainUsers();
  const { hrTable } = HrData();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (userData?.role === "user" && interviews?.length > 0) {
      const filteredInterviews = interviews.filter((interview: any) => {
        const interviewDate = new Date(interview.slot);
        return (
          interview.user_id === userData.id &&
          interview.is_confirmed === "confirmed" &&
          interviewDate > new Date()
        );
      });
      setUserCount(filteredInterviews.length);
    } else if (userData?.role === "hr" && interviews?.length > 0) {
      const filteredInterviews = interviews.filter(
        (item: any) => item.hr_id === userData.id
      );
      const unconfirmedInterviews = filteredInterviews.filter(
        (item: any) => item.is_confirmed === "unConfirmed"
      );
      setHrNotificationsCount(unconfirmedInterviews.length);
    }
  }, [userData, interviews]);

  const handleClickOpen = () => {
    setBell(!bell);
    router.push(userData?.role === "hr" ? "/notifications" : "/Userbell");
  };

  return (
    <div>
      {!userData ? (
        <div className="w-full h-full">
          <SkeletonLoaderResNavbar />
        </div>
      ) : (
        <div className="bg-[#FFFFFF] text-black shadow-lg fixed top-0 w-full z-50">
          <div className="flex-col flex">
            <div className="border-b">
              <div className="flex h-16 items-center px-4">
                <div className="md:block w-full ml-5 mb-1.5 cursor-pointer">
                  <Link href={"/dashboards"}>
                    <Image
                      height={120}
                      width={120}
                      src="/RN-new-black.png"
                      alt="logo"
                    />
                  </Link>
                </div>

                <div className="ml-auto flex items-center space-x-1 sm:space-x-6">
                  {userData?.role === "hr" && (
                    <button
                      onClick={() => setShowModal(true)}
                      className="mr-2"
                    >
                      <Share2 color="black" size={20} />
                    </button>
                  )}
                  {showModal && <Modal onClose={() => setShowModal(false)} />}

                  {(userData?.role === "hr" || userData?.role === "user") && (
                    <div className="flex items-center relative">
                      <span className="bg-blue-500 w-4 h-4 rounded-full text-white text-xs flex items-center justify-center absolute top-[-6px] right-[-4px]">
                        {userData?.role === "user"
                          ? userCount
                          : hrNotificationsCount}
                      </span>
                      <button
                        onClick={handleClickOpen}
                        className="cursor-pointer"
                      >
                        <Bell
                          className=""
                          color={`${
                            pathname ===
                            (userData?.role === "hr"
                              ? "/notifications"
                              : "/Userbell")
                              ? "#4765FF"
                              : "black"
                          }`}
                          size={24}
                        />
                      </button>
                    </div>
                  )}

                  <UserNav />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
