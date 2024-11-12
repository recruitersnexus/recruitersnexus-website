
import Footer from "../comps/Footer";
import { ChevronsRight } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div>
      <div className=" py-20 flex flex-col justify-center items-center px-6 sm:px-12 lg:px-32">
        {/* <p className="text-base font-semibold leading-7 text-indigo-600">Deploy faster</p> */}
        <h1 className="font-nunito mt-2 text-3xl font-bold tracking-tight text-white sm:text-5xl">
          Terms of Use
        </h1>
        <h1 className="font-nunito mt-2 text-lg font-bold tracking-tight text-white sm:text-4xl"></h1>
        <p className="font-be mt-6 text-xl leading-8 text-white">
          Effective Date: March 1, 2024
        </p>
        <p className="font-be mt-6 text-xl leading-8 ">
          Welcome to our platform recruitersnexus. The Platform is designed to
          facilitate mock interviews between interviewees and interviewers.
          Please carefully read the following Terms of Use, as they outline your
          rights and responsibilities and form a legally binding agreement
          between you and the Platform regarding your use of the service.
        </p>
      
        <div className="relative flex py-5 items-center w-full">
          <div className="flex-grow border-t border-[#0000003c]" />
        </div>
        <div id="Main-Container">
          <div>
            {/* <br /> */}
            <h2 className="font-nunito mt-2 text-3xl font-bold tracking-tight text-[#5873FE]">
              Acceptance of Terms
            </h2>

            <p className=" font-be mt-2">
              By accessing or using the Platform, you agree to comply with and
              be bound by these Terms. If you do not agree with all of these
              Terms, you are prohibited from using the Platform.
            </p>
          </div>
          <div className="relative flex py-5  items-center w-full">
            <div className="flex-grow border-t border-[#0000003c]" />
          </div>
          <div>
            <h2 className="font-nunito mt-2 text-3xl font-bold tracking-tight text-[#5873FE]">
              Eligibility
            </h2>
            <p className=" font-be mt-2">
              The Platform is intended for individuals who are 13 years of age
              or older. By using this service, you represent and warrant that
              you meet this requirement. If you do not meet this requirement,
              you must not access or use the Platform.
            </p>
            
          </div>
          <div className="relative flex py-5 items-center w-full">
            <div className="flex-grow border-t border-[#0000003c]" />
          </div>
          <div>
            <h2 className="font-nunito mt-2 text-3xl font-bold tracking-tight text-[#5873FE]">
              User Accounts
            </h2>
            <div className=" font-be mt-2">
              <span className="flex ">
                <div className="aspect-square">
                  <div className="aspect-square">
                    <ChevronsRight size={24} color="black" />
                  </div>
                </div>
                <p className="font-be ml-2">
                  <span className="font-semibold">Account Creation:</span> You
                  may need to create an account to access certain features of
                  the Platform. You agree to provide accurate and complete
                  information when creating an account and to update your
                  information promptly if it changes.
                </p>
              </span>{" "}
              <span className="flex ">
                <div className="aspect-square">
                  <div className="aspect-square">
                    <ChevronsRight size={24} color="black" />
                  </div>
                </div>
                <p className="font-be ml-2">
                  <span className="font-semibold">Account Security:</span> You
                  are responsible for maintaining the confidentiality of your
                  account credentials and for all activities that occur under
                  your account. Notify us immediately if you suspect any
                  unauthorized access to your account.
                </p>
              </span>
            </div>
          </div>
          <div className="relative flex py-5 items-center w-full">
            <div className="flex-grow border-t border-[#0000003c]" />
          </div>
          <div>
            <h2 className="font-nunito mt-2 text-3xl font-bold tracking-tight text-[#5873FE]">
              Use of the Platform
            </h2>
            <div className=" font-be mt-2">
              <span className="flex ">
                <div className="aspect-square">
                  <div className="aspect-square">
                    <ChevronsRight size={24} color="black" />
                  </div>
                </div>
                <p className="font-be ml-2">
                  <span className="font-semibold">Purpose: </span>
                  The Platform is intended for personal, non-commercial use
                  only. You may not use the Platform for any other purpose,
                  including any way that breaches any applicable privacy policy
                  or other agreements.
                </p>
              </span>{" "}
              <span className="flex ">
                <div className="aspect-square">
                  <div className="aspect-square">
                    <ChevronsRight size={24} color="black" />
                  </div>
                </div>
                <p className="font-be ml-2">
                  <span className="font-semibold">Acceptable Use: </span>
                  Your use of the Platform is subject to the limitations set
                  forth in these Terms. Any use of the Platform in violation of
                  these Terms will be considered an infringement of the
                  Platform&#39;s rights.
                </p>
              </span>
            </div>
          </div>
          <div className="relative flex py-5 items-center w-full">
            <div className="flex-grow border-t border-[#0000003c]" />
          </div>
          <div>
            <h2 className="font-nunito mt-2 text-3xl font-bold tracking-tight text-[#5873FE]">
              Intellectual Property
            </h2>
            <div className=" font-be mt-2">
              <span className="flex ">
                <div className="aspect-square">
                  <div className="aspect-square">
                    <ChevronsRight size={24} color="black" />
                  </div>
                </div>
                <p className="font-be ml-2">
                  <span className="font-semibold">Ownership: </span>
                  All content and materials provided through the Platform are
                  owned by or licensed to us and are protected by intellectual
                  property laws.
                </p>
              </span>{" "}
              <span className="flex ">
                <div className="aspect-square">
                  <div className="aspect-square">
                    <ChevronsRight size={24} color="black" />
                  </div>
                </div>
                <p className="font-be ml-2">
                  <span className="font-semibold">Use of Content:</span>
                  You are granted a limited, non-exclusive license to access and
                  use the content provided through the Platform for personal,
                  non-commercial purposes only.
                </p>
              </span>
            </div>
          </div>
        
          <div className="relative flex py-5 items-center w-full">
            <div className="flex-grow border-t border-[#0000003c]" />
          </div>
          <div>
            <h2 className="font-nunito mt-2 text-3xl font-bold tracking-tight text-[#5873FE]">
              Termination
            </h2>
            <div className=" font-be mt-2">
              <div className="flex justify-start w-full">
                <p className="font-be  text-[16px]">
                  The Terms of Use are effective until terminated. We reserve
                  the right to terminate or suspend your access to the Platform
                  at any time, with or without notice, for any conduct that we
                  consider to be unacceptable or a violation of these Terms.
                </p>
              </div>
            </div>
          </div>
          <div className="relative flex py-5 items-center w-full">
            <div className="flex-grow border-t border-[#0000003c]" />
          </div>
          <div>
            <h2 className="font-nunito mt-2 text-3xl font-bold tracking-tight text-[#5873FE]">
              Dispute Resolution
            </h2>
            <div className=" font-be mt-2">
              <div className="flex justify-start w-full">
                <p className="font-be  text-[16px]">
                  These Terms shall be governed by and construed in accordance
                  with the laws. Any disputes arising out of or relating to
                  these Terms shall be resolved exclusively by the consumer
                  court.
                </p>
              </div>
            </div>
          </div>
          <div className="relative flex py-5 items-center w-full">
            <div className="flex-grow border-t border-[#0000003c]" />
          </div>
          <div>
            <h2 className="font-nunito mt-2 text-3xl font-bold tracking-tight text-[#5873FE]">
              Limitation of Liability
            </h2>
            <p className=" font-be mt-2">
              We are not responsible for any damages arising out of your use of
              the Platform. In no event shall we be liable for any indirect,
              incidental, special, exemplary, punitive, or other consequential
              damages.
            </p>
          </div>
          <div className="relative flex py-5 items-center w-full">
            <div className="flex-grow border-t border-[#0000003c]" />
          </div>
          <div>
            <h2 className="font-nunito mt-2 text-3xl font-bold tracking-tight text-[#5873FE]">
              Changes to Terms of Use
            </h2>
            <p className=" font-be mt-2">
              We reserve the right to change, modify, add to, or delete any of
              the terms and conditions of these Terms at any time without prior
              notice. Your continued use of the Platform following any changes
              constitutes your acceptance of such changes.
            </p>
          </div>
          <div className="relative flex py-5 items-center w-full">
            <div className="flex-grow border-t border-[#0000003c]" />
          </div>
          <div>
            <h2 className="font-nunito mt-2 text-3xl font-bold tracking-tight text-[#5873FE]">
              Third Party Websites or Resources
            </h2>
            <p className=" font-be mt-2">
              The Platform may provide links to third-party websites or
              resources for your convenience. We are not responsible for the
              content or availability of any such third-party sites or
              resources.
            </p>
          </div>
          <div className="relative flex py-5 items-center w-full">
            <div className="flex-grow border-t border-[#0000003c]" />
          </div>
          <div>
            <h2 className="font-nunito mt-2 text-3xl font-bold tracking-tight text-[#5873FE]">
              Contact Us
            </h2>
            <p className=" font-be mt-2">
              If you have any questions about these Terms, please contact us at
              recruitersnexus@gmail.com.
            </p>
            <p className=" font-be mt-2">
              By using the Platform, you acknowledge that you have read,
              understood, and agree to be bound by these Terms of Use.{" "}
            </p>
          </div>
          <div className="relative flex py-5 items-center w-full">
            <div className="flex-grow border-t border-[#0000003c]" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
