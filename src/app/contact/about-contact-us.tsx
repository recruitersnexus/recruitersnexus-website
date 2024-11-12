// import { PenSquare, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const AboutContactUs = () => {
  return (
    <div className="w-full h-auto  flex flex-col lg:flex-row  ">
      {/* left image  */}
      <div className=" w-full lg:w-[55%]  h-auto relative ">
        <div className="w-full h-auto  xl:absolute  z-30 top-0 bg-white xl:min-h-[860px] left-[120px] md:px-[60px] xl:pl-0 px-6 ">
       

          <div className=" h-auto w-full  pr-0 pt-[200px] lg:pt-[120px] xl:pt-[240px]  pb-[110px] text-right">
            <span className="font-heading text-lg text-blueDefault font-semibold text-left  ">
              Reach out to Recruiters Nexus
            </span>
            <br />
            <br />
            <br />
            <span className="font-heading text-4xl font-semibold text-blackText">
              Call us today, leave a message,
            </span>

            <br />
            <span className="font-heading text-4xl font-semibold text-blackText">
              email or find your nearest
            </span>
            <br />
            <span className="font-heading text-4xl font-semibold text-blackText">
              office below.
            </span>

            <br />
            <br />
            <br />
            <Link
              href="#"
              className=" flex font-heading h-full justify-end items-center text-base  pl-3  font-semibold uppercase "
            >
              <div className=" flex ">
                <span className=" bg-blueDefault p-3 lg:p-5">
                  {/* <Phone strokeWidth={1.5} color="white" size={28} /> */}
                </span>
                <span className="font-heading text-[17px]  border-2 border-blueDefault  text-blackText justify-center items-center flex px-5 py-3 lg:px-9 lg:py-6 hover:text-white hover:bg-blueDefault">
                  888-699-2432
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
      {/* right content  */}
      <div className=" w-full lg:w-[55%] xl:w-[65%] h-auto">
        <div className="w-full h-auto xl:min-h-[980px]  right-0 lg:mt-[-120px] bg-blackText relative flex place-items-center ">
          <div className="absolute w-full h-full ">
            <Image
              src="/conatct_form_background.jpg"
              alt="Hero img"
              fill={true}
              quality={75}
              objectFit="cover"
            />
          </div>

          <div
            className="absolute w-full h-full z-0"
            style={{
              backgroundColor: "rgba(0, 109, 212, 0.15)",
            }}
          />

          <div className="container px-[60px] h-auto  mx-0 w-full  z-10">
            <div className="lg:min-h-[812px] text-blackText xl:min-h-[980px] mx-auto lg:ml-0 py-16  lg:pt-[240px] xl:pt-[360px] lg:pb-[120px] xl:pl-[120px] xl:mr-[30px] max-w-[600px]">
              <span className="font-heading text-lg text-blueDefault font-semibold text-left uppercase ">
                Free legal consultation{" "}
              </span>
              <br />
              <br />
              <div className="w-full mx-auto text-blackText ">
                <div className="flex flex-wrap -m-2 ">
                  <div className="p-2 w-full md:w-1/2 ">
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Name*"
                        className="w-full h-14 text-base placeholder:text-blackText outline-none bg-contactInout text-blackText py-1 px-3 leading-8 "
                      />
                    </div>
                  </div>
                  <div className="p-2 w-full md:w-1/2 ">
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email*"
                        className="w-full h-14 placeholder:text-blackText text-base outline-none bg-contactInout text-blackText py-1 px-3 leading-8 "
                      />
                    </div>
                  </div>
                  <div className="p-2 w-full">
                    <div className="relative">
                      <input
                        type="text"
                        id="telephone"
                        name="telephone"
                        placeholder="Telephone*"
                        className="w-full h-14 text-base outline-none placeholder:text-blackText bg-contactInout text-blackText py-1 px-3 leading-8 "
                      />
                    </div>
                  </div>
                  <div className="p-2 w-full">
                    <div className="relative">
                      <select
                        id="optionSelect"
                        name="optionSelect"
                        defaultValue="false"
                        className="w-full h-14 bg-contactInout text-blackText text-base outline-none  py-1 px-3 leading-8 "
                      >
                        <option value="1">Request for an appointment</option>
                        <option value="2">Inquiry</option>
                        <option value="3">Case Status</option>
                        <option value="4">Other Legal Advice</option>
                      </select>
                    </div>
                  </div>
                  <div className="p-2 w-full">
                    <div className="relative">
                      <textarea
                        id="message"
                        name="message"
                        placeholder="Brief description of your legal issue*"
                        className="w-full bg-contactInout placeholder:text-blackText text-blackText  h-32 text-base outline-none  py-1 px-3 resize- ease-in-out"
                      ></textarea>
                    </div>
                  </div>
                  <div className=" flex justify-start items-start p-2  w-full">
                    <button className="flex   text-white bg-blueDefault  hover:border-2 py-2 px-10 focus:outline-none hover:bg-white hover:text-blackText rounded-none text-lg">
                      SUBMIT
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutContactUs;