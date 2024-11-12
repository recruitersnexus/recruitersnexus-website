"use client";
import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";
import useUserData from "@/lib/db/userData";
import { useRouter } from "next/navigation";

import { Envelope, Twitter, Linkedin, Medium } from "../../../icons";
import MainUsers from "@/lib/db/mainUsers";
import QualificationData from "@/lib/db/qualificationData";
import HrData from "@/lib/db/hrData";
import { userData } from "@/data/page-data";
import { Camera } from "lucide-react";
import { Check } from "lucide-react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import Rating from "@/app/dashboard/components/Rating";
import RatingUser from "@/app/dashboard/components/RatingUser";
import { Trash } from "lucide-react";
import VerificationData from "@/lib/db/vertificationData";
import { Trash2 } from "lucide-react";

const Sidebar = ({ data, newData, id }: any) => {
  const { userData } = useUserData();
  const { role, education, contactLinks } = data;
  const { users } = MainUsers();
  const [loading, setLoading] = useState(false);
  // const [fetchedData, setFetchedData] = useState([]);
  const fetchedData = users;
  const router = useRouter();
  const { qualification } = QualificationData();
  const { hrTable } = HrData();
  // const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [cancel, setCancel] = useState("hidden");
  const [showButtons, setshowButtons] = useState(false);
  const { verification } = VerificationData();
  // //console.log("id: ",id );
  // //console.log("Fetched Data",fetchedData);

  const filteredData: userData[] = fetchedData?.filter(
    (item: any) => item?.id === id
  );
  // //console.log("Filtered Data: ", filteredData);
  const filteredQualificaton = qualification
    ?.filter((item: any) => item.user_id === id)
    .reverse();
  const filteredHrTable = hrTable?.filter((item: any) => item.user_id === id);
  const filteredVerifications = verification?.filter(
    (item: any) => userData?.id === item?.user_id
  );

  async function onClickDelete(id: any) {
    try {
      // //console.log("Slot: ", slot);
      // alert("Slot: " + slot);

      const data = await fetch("/api/qualification", {
        method: "DELETE",
        body: JSON.stringify({ id: id, user_id: userData?.id }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      //   setDeletionStatus((prevStatus) => !prevStatus);

      //   //console.log("Deletion status updated:", deletionStatus);
      //   setForceUpdate(prev => !prev);

      //   alert("Skill Deleted!");
      toast.success("Qualification Deleted");

      return data.json();
      // return {"message":"deleted"}
    } catch (error) {
      //console.log(error);
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setshowButtons(true);
      setCancel("flex");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (!selectedImage) {
        console.error("No image selected.");
        return;
      }

      const image = document.createElement("img");

      // Set the source of the image to the selected image file
      image.src = URL.createObjectURL(selectedImage);

      image.onload = () => {
        const width = image.width;
        const height = image.height;

        if (width !== height) {
          toast.error(
            "Please upload an image with equal width and height (square aspect ratio)."
          );
          return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append("file", selectedImage);
        formData.append(
          "upload_preset",
          `${process.env.NEXT_PUBLIC_upload_presets}` || ""
        );

        fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_cloud_name}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error(
                "Failed to upload image to Cloudinary. Status: " +
                  response.status
              );
            }
            return response.json();
          })
          .then((data) => {
            const uploadedImageUrl = data.secure_url;
            setImageUrl(uploadedImageUrl);

            fetch(`/api/picture`, {
              method: "PUT",
              body: JSON.stringify({
                id: userData?.id,
                image: uploadedImageUrl,
              }),
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
            })
              .then((res) => {
                if (!res.ok) {
                  toast.error("Error submitting image");
                  return;
                }
                toast.success("Image has been updated");
                setCancel("hidden");
              })
              .catch((error) => {
                console.error("Error submitting image:", error);
              })
              .finally(() => {
                setLoading(false);
              });
          })
          .catch((error) => {
            console.error("Failed to upload image to Cloudinary:", error);
            setLoading(false);
          });
      };
    } catch (error) {
      console.error("Error uploading image:", error);
      setLoading(false);
    }
  };

  async function onClickHandler() {
    router.push(`/schedule_interview/${id}`);
    // try {

    // 	// //console.log("Form Data: " , service,experience,certif,aoe);
    // 	setLoading(true);
    // 	const res = await fetch("/api/mail",{
    // 		method: 'POST',
    // 		body: JSON.stringify({}),
    // 		headers: {
    // 			"Content-type": "application/json; charset=UTF-8"
    // 		},

    // 	})

    // 	return res;
    // } catch (error) {
    // 	//console.log(error);

    // }
    // finally{
    // 	setLoading(false);
    // }
  }

  const handleCancel = () => {
    setCancel("hidden"); // Hide the cancel button

    setshowButtons(false);
  };

  return (
    <div className="bg-black flex flex-col content-between w-full h-auto sm:h-full inset-0 sm:justify-around sm:w-1/3 sm:sticky">
      <div className="text-white flex flex-col p-10 items-center">
        {newData.map((key: any) => (
          <div key={key.id}>
            {key.user_id == id ? (
              <div>
                <div className="relative">
                  <div className="rounded-full overflow-hidden h-3/4 w-3/4 m-auto">
                    <div className="h-full w-full rounded-full overflow-hidden">
                      <Image
                        priority
                        quality={100}
                        width={500}
                        height={500}
                        objectFit="cover"
                        src={`${filteredData[0]?.image || "/demoProfile.jpg"}`}
                        alt="Profile Picture"
                        aria-label="Profile Picture"
                      />
                    </div>
                  </div>
                  <label
                    htmlFor="image-upload"
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 p-1 bg-gray-800 rounded-full cursor-pointer"
                  >
                    <Camera size={24} color="#FFF" />
                    <input
                      id="image-upload"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>

                {showButtons && (
                  <div
                    className={`${cancel}  items-center space-x-4 mt-4 justify-center w-full`}
                  >
                    <button
                      className={
                        "text-yellow-500 hover:text-green-600 font-bold text-xl"
                      }
                      disabled={loading}
                      onClick={handleSubmit}
                      type="submit"
                    >
                      <Check />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 font-bold text-xl"
                      onClick={handleCancel}
                    >
                      <X />
                    </button>
                  </div>
                )}

                <h1 className="text-4xl sm:text-6xl mb-2">
                  {key.fname} {key.lname}
                </h1>
                <h3 className="mb-8">{filteredData[0]?.role.toUpperCase()}</h3>
                {filteredData && filteredData[0]?.role === "hr" ? (
                  <Rating id={id} />
                ) : (
                  filteredData &&
                  filteredData[0]?.role === "user" && <RatingUser id={id} />
                )}
                {userData && userData?.role != "hr" && userData?.id != id && (
                  <button
                    className={`px-5 py-2 ${
                      userData.id == id ? "hidden" : ""
                    } ${userData.role == "hr" ? "hidden" : ""} ${
                      key.role == "user" && userData.role == "user"
                        ? "hidden"
                        : ""
                    } bg-[#68F590] hover:bg-[#FAFAFA] rounded-lg text-black font-bold my-5`}
                    disabled={loading}
                    onClick={onClickHandler}
                    type="submit"
                  >
                    {loading ? "Loading" : "Schedule Now"}
                  </button>
                )}
                <h2 className="font-bold">Education</h2>
                <div className="relative flex py-5 items-center">
                  <div className="flex-grow border-t border-white"></div>
                </div>
                {filteredQualificaton.map((item: any) => (
                  <div key={item.id}>
                    <div className="flex justify-end w-full">
                      <button
                        disabled={
                          filteredVerifications[0]?.verified === "unverified"
                        }
                        className={`${
                          userData?.id === id ? "visible" : "hidden"
                        } ${
                          filteredVerifications[0]?.verified === "unverified"
                            ? "cursor-not-allowed"
                            : "visible"
                        }}`}
                        onClick={() => onClickDelete(item.id)}
                      >
                        <Trash2 className="w-6 cursor-pointer hover:text-red-500 text-white h-6 flex  mr-1 mt-1 " />
                      </button>
                    </div>
                    <h2>{item.degree}</h2>
                    <p className="mb-2">{item.institute}</p>
                    <p>
                      <b>Specaillization: </b>
                      {item.speciallization}
                    </p>
                    <p>
                      {item.cgpa} ({item.passing_year})
                    </p>
                    <div className="relative flex py-5 items-center">
                      <div className="flex-grow border-t border-white"></div>
                    </div>
                  </div>
                ))}
                {/* <div className='text-white text-center mb-4 mt-4 sm:mt-8'>
									<h3 className='mb-2'> CONTACT ME</h3>
									<div className='flex flex-row justify-center gap-2'>
										<a
											className='icons-contactme'
											href={contactLinks?.[0]}
											aria-label={"email link"}
										>
											<Envelope />
										</a>
										<a
											className='icons-contactme'
											href={contactLinks?.[1]}
											aria-label={"twitter link"}
										>
											<Twitter />
										</a>
										<a
											className='icons-contactme'
											href={contactLinks?.[2]}
											aria-label={"linkedin link"}
										>
											<Linkedin />
										</a>
										<a
											className='icons-contactme'
											href={contactLinks?.[3]}
											aria-label={"medium link"}
										>
											<Medium />
										</a>
									</div>
								</div> */}
              </div>
            ) : (
              <div className=" font-bold flex items-center justify-center">
                <h1 className="text-white">USER NOT FOUND!!</h1>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
