"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { format } from "date-fns";
import Rating from "./Rating";
import { userData } from "@/data/page-data";
import MainUsers from "@/lib/db/mainUsers";
import SkeletonLoaderCustom from "@/components/SkeletonLoaderCustom";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import SpinnerLoader from "./SpinnerLoader";
import HrData from "@/lib/db/hrData";

export function RecentSales() {
  const { users } = MainUsers();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const {hrTable} = HrData();
  const formatDateTime = (dateTimeString: any) => {
    const optionsDate: any = { year: "numeric", month: "long", day: "numeric" };
    const optionsTime: any = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    };

    const date = new Date(dateTimeString);
    const formattedDate = format(date, "dd-MMMM-yyyy", optionsDate);
    const formattedTime = format(date, "HH:mm:ss zzz", optionsTime);

    return {
      date: formattedDate,
      time: formattedTime,
    };
  };

  //  const hrList:userData[] = users;
  const filteredHr = users?.filter((item: any) => item.role === "hr");
  // const filteredHr = [];

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = filteredHr.slice(firstItemIndex, lastItemIndex);

  const [screenLoading, setScreenLoading] = useState(true);

  useEffect(() => {
    setScreenLoading(true);
    setTimeout(() => {
      setScreenLoading(false);
    }, 2000);
  }, []);

  return (
    <div>
      {screenLoading ? (
        <SpinnerLoader />
      ) : (
        <>
          {
          // filteredHr ? (
            <div className="space-y-2 gap-x-4 min-h-[500px] max-h-[500px] overflow-y-auto ">
              {filteredHr.length !== 0 ? (
                <>
                  {currentItems.map((item: any) => {
                    return (
                      <div
                        key={item?.id}
                        className="grid grid-cols-1 lg:grid-cols-4 gap-3 place-items-start lg:place-items-stretch  bg-white  p-4 shadow-md rounded-lg   gap-x-10 text-sm md:text-lg"
                      >
                        <div className="space-y-3 lg:space-y-0">
                          <div className="flex items-center p-2">
                            <Avatar className="h-11 w-11">
                              <AvatarImage src={item?.image} />
                              <AvatarFallback>HR</AvatarFallback>
                            </Avatar>
                            <div className="ml-4 space-y-1">
                              
                              <div className="flex flex-col space-y-3">
                              <p className="text-sm font-medium leading-none text-black">
                                {item?.username} 
                              </p>
                              <p className="text-sm font-medium leading-none">{hrTable?.filter((info:any)=> info.user_id === item?.id)[0]?.designation}</p>
                              </div>
                              
                              
                              {/* <p className="text-sm font-medium leading-none">
                                {item?.designation}
                              </p> */}
                              <div className="font-sm text-sm lg:hidden grid grid-cols-1 gap-x-2 ">
                                <span className="text-md text-[#6D6D6D]">
                                  Joined:
                                </span>
                                <span>
                                  {formatDateTime(item?.createdAt).date}
                                </span>
                                {/* {`joined ${formatDateTime(item?.createdAt).date}`} */}
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 lg:hidden">
                            <Rating id={item?.id} />
                          </div>

                          <div className="ml-auto font-medium grid grid-cols-1 gap-y-4 lg:hidden gap-x-4">
                            <Button className="bg-[#ECF2FF] text-[#4765FF] hover:bg-[#ECF2FF]/80  h-11 rounded-lg">
                              <Link href={`/profile?id=${item?.id}`}>
                                View Profile
                              </Link>
                            </Button>
                            <Button className="bg-[#4765FF] hover:bg-[#4765FF]/80  h-11 rounded-lg">
                              <Link href={`/scheduleInterview?id=${item?.id}`}>
                                Schedule Interview
                              </Link>
                            </Button>
                          </div>
                        </div>

                        <div className=" font-medium hidden lg:grid lg:grid-cols-1  text-sm">
                          <div className="flex flex-col space-y-2 justify-center">
                            <span className="text-md text-[#6D6D6D]">
                              Joined:
                            </span>{" "}
                            <span className="text-[#333333]">
                              {formatDateTime(item?.createdAt).date}
                            </span>{" "}
                          </div>
                        </div>

                        <div className="lg:grid lg:grid-cols-1 hidden  text-sm ">
                          <Rating id={item?.id} />
                        </div>

                        <div className=" font-medium hidden grid-cols-2 lg:grid gap-x-4">
                          <Button className="bg-[#4765FF] hover:bg-[#4765FF]/80 text-xs lg:text-md  h-11 rounded-lg ">
                            <Link href={`/scheduleInterview?id=${item?.id}`}>
                              Schedule Interview
                            </Link>
                          </Button>
                          <Button className="bg-[#ECF2FF] text-[#4765FF] hover:bg-[#ECF2FF]/80 text-xs lg:text-md  h-11 rounded-lg">
                            <Link href={`/profile?id=${item?.id}`}>
                              View Profile
                            </Link>
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                // filteredHr &&
                // filteredHr.length === 0 && (
                  <div className="flex w-full h-screen justify-center items-start">
                    <div className="flex bg-white w-[400px] h-[200px] justify-center rounded-lg shadow-md items-center">
                      {" "}
                      <h1 className="font-nunito font-bold text-3xl text-[#242E49]">
                        No HR Found
                      </h1>
                    </div>
                  </div>
                // )
              )}
            </div>
          // )
          //  : 
          // (
          //   <div className="w-full">
          //     {" "}
          //     <SkeletonLoaderCustom />{" "}
          //   </div>
          // )
          }


          <div className="mt-16">
            <PaginationSection
              totalItems={filteredHr.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </>
      )}
    </div>
  );
}

function PaginationSection({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}: {
  totalItems: any;
  itemsPerPage: any;
  currentPage: any;
  setCurrentPage: any;
}) {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pages.push(i);
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="cursor-pointer hover:bg-neutral-200"
            onClick={() => handlePrevPage()}
          />
        </PaginationItem>

        {pages.map((page, idx) => (
          <PaginationItem key={idx}>
            <PaginationLink
              className={
                currentPage === page
                  ? "bg-[#4765FF] hover:bg-[#4765FF] text-white hover:text-white cursor-pointer rounded-md"
                  : "hover:bg-[#4765FF] hover:text-white cursor-pointer"
              }
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            className="cursor-pointer hover:bg-neutral-200"
            onClick={() => handleNextPage()}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
