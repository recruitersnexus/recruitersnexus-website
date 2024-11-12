"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/Button";
import useUserData from "@/lib/db/userData";
import FeedbackData from "@/lib/db/feedbackData";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import MainUsers from "@/lib/db/mainUsers";
import toast from "react-hot-toast";

const StarRating = ({ value, onStarClick }: any) => {
  const [hoverValue, setHoverValue] = useState(0);

  const handleStarClick = (rating: any) => {
    onStarClick(rating);
  };

  return (
    <div>
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <span
            key={index}
            style={{
              cursor: "pointer",
              fontSize: "24px",
              color: index < (hoverValue || value) ? "gold" : "grey",
            }}
            onMouseEnter={() => setHoverValue(ratingValue)}
            onMouseLeave={() => setHoverValue(0)}
            onClick={() => handleStarClick(ratingValue)}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

const FeedbackHr = ({ id }: any) => {
  const [candidate, setcandidate] = useState("");
  const [Strength, setStrength] = useState("");
  const [weakness, setWeakness] = useState("");
  const [description, setDescription] = useState("");
  const { userData } = useUserData();
  const searchParams = useSearchParams();
  const slot = searchParams.get("slot");
  const { feedback } = FeedbackData();
  const router = useRouter();
  const { users } = MainUsers();
  const filteredFeedback = feedback?.filter(
    (item: any) =>
      item?.hr_id === userData?.id &&
      item?.slot === slot &&
      item?.user_id === id
  );
  const filteredData = users?.filter((item: any) => item?.id === id);
  const [user_rating, setuser_rating] = useState(0);

  async function onClickDashboard() {
    router.push("/dashboards");
  }
  async function onSubmit() {
    try {
      if (
        candidate.length === 0 ||
        candidate === null ||
        weakness.length === 0 ||
        weakness === null ||
        description.length === 0 ||
        description === null ||
        Strength.length === 0 ||
        Strength === null
      ) {
        // alert("Please enter the candidate name!");
        toast.error("Please fill all the fields");
        return;
      }

      if (filteredFeedback[0]) {
        // alert("Feedback already exists");
        // toast.error("Feedback already exists");
        const res = await fetch("/api/feedback", {
          method: "PUT",
          body: JSON.stringify({
            candidate_name: candidate,
            strength: Strength,
            weakness: weakness,
            description: description,
            slot: slot,
            user_rating: user_rating,
            hr_id: userData?.id,
            user_id: id,
          }),
        });
        if (!res.ok) {
          // alert("Error in updating data");
          toast.error("Error in updating data");
          return;
        }
        // alert("Data updated!");
        toast.success("Feedback updated!");
      } else {
        // alert("New feedback data inserted by HR!")
        toast.success("Feedback has been submitted. Thank you!");
        const res = await fetch("/api/feedback", {
          method: "POST",
          body: JSON.stringify({
            candidate_name: candidate,
            strength: Strength,
            weakness: weakness,
            description: description,
            slot: slot,
            user_rating: user_rating,
            hr_id: userData?.id,
            user_id: id,
          }),
        });
        if (!res.ok) {
          alert("Error in inserting data");
          toast.error("Error in inserting data");
          return;
        }
        window.location.reload();
      }
    } catch (error) {
      //console.log(error);
    }
  }

  const handleUserRating = (rating: any) => {
    setuser_rating(rating);
  };

  return (
    <div className="flex  bg-gray-400 h-full py-4 md:py-0 md:h-screen items-center justify-center">
      <div className=" w-11/12 md:w-5/6 h-full   md:h-5/6 space-x-0 py-4 md:py-0 px-4 md:px-0 md:space-x-9 bg-[#242E49] shadow-lg rounded-lg text-white flex justify-start md:justify-around items-start md:items-center">
        <div className="flex flex-col space-y-6 w-2/5 items-start ">
          <div>
            <h2 className="my-1 md:my-4 text-sm md:text-2xl font-bold">
              Feedback form{" "}
            </h2>
          </div>
          <div className="md:hidden block">
            <Image
              priority
              width={200}
              height={200}
              className="rounded-full h-1/2 mb-1 md:mb-6 "
              src={`${filteredData[0]?.image || "/demoProfile.jpg"}`}
              alt="Picture Profile"
              aria-label="Picture Profile"
            />
          </div>

          <div className="flex md:space-x-4 md:flex-row flex-col space-y-4 md:space-y-0 ">
            <span className="font-bold md:text-md text-xs">Candidate Name</span>
            <input
              type="text"
              className="border-black w-48 md:w-full border-2 py-0 px-2  md:p-2 text-black"
              placeholder="Enter candidate name.."
              value={candidate}
              onChange={(e) => setcandidate(e.target.value)}
              id="candidate"
            />
          </div>

          <div className="flex md:space-x-4 md:flex-row flex-col space-y-4 md:space-y-0">
            <span className="font-bold md:text-md text-xs">Strength</span>
            <input
              type="text"
              className="border-black w-48 md:w-full border-2 py-0 px-2  md:p-2 text-black"
              placeholder="Enter strength.."
              value={Strength}
              onChange={(e) => setStrength(e.target.value)}
              id="strength"
            />
          </div>

          <div className="flex md:space-x-4 md:flex-row flex-col space-y-4 md:space-y-0">
            <span className="font-bold md:text-md text-xs">Weakness</span>
            <input
              type="text"
              className="border-black w-48 md:w-full border-2 py-0 px-2  md:p-2 text-black"
              placeholder="Enter weakness.."
              value={weakness}
              onChange={(e) => setWeakness(e.target.value)}
              id="weakness"
            />
          </div>

          <div className="flex md:space-x-4 md:flex-row flex-col space-y-4 md:space-y-0">
            <span className="font-bold md:text-md text-xs">Description</span>
            <input
              type="text"
              className="border-black w-48 md:w-full border-2 py-0 px-2  md:p-2 text-black"
              placeholder="Enter description.."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="description"
            />
          </div>

          <div>
            <span className="font-bold text-lg">Rating: </span>
            <StarRating value={user_rating} onStarClick={handleUserRating} />
          </div>

          <div className="flex space-x-4">
            <Button className="text-sm md:text-lg" onClick={onSubmit}>
              Submit
            </Button>
            <Button className="text-sm md:text-lg" onClick={onClickDashboard}>
              Back to Dashboard!
            </Button>
          </div>
        </div>

        <div className="md:block hidden">
          <Image
            priority
            width={200}
            height={200}
            className="rounded-full h-full mb-6 "
            src={`${filteredData[0]?.image || "/demoProfile.jpg"}`}
            alt="Picture Profile"
            aria-label="Picture Profile"
          />
        </div>
      </div>
    </div>
  );
};

export default FeedbackHr;
