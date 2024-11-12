

import { ChevronsRight } from "lucide-react";
import Link from "next/link";
import Footer from "../comps/Footer";

export default function PrivacyPolicy() {
  return (
    <>
      <div className=" py-20 flex flex-col justify-center items-center px-6 sm:px-12 lg:px-32">
        {/* <p className="text-base font-semibold leading-7 text-indigo-600">Deploy faster</p> */}
        <h1 className="font-nunito mt-2 text-3xl font-bold tracking-tight text-white sm:text-5xl">
          Privacy Policy
        </h1>
        {/* <h1 className="font-nunito mt-2 text-lg font-bold tracking-tight text-gray-900 sm:text-4xl"></h1> */}
        <p className="font-be mt-6 text-xl leading-8 text-gray-100">
          Effective Date: March 1, 2024
        </p>
        <p className="font-be mt-6 text-xl leading-8 text-gray-100">
          This Privacy Policy describes how Recruiters Nexus may collect and use
          the personal information you provide when using the Service. Service
          includes the website{" "}
          <Link href="/" className="text-blue-600 font-medium">
            https://www.recruitersnexus.com/
          </Link>{" "}
          and its subdomains and any related content, software, applications,
          materials and/or services made available by recruitersnexus.com
          through the Website.
        </p>
        <div className="flex justify-start w-full">
          <p className="font-be mt-6 text-xl leading-8 text-gray-100">
            BY USING THE SERVICE YOU AGREE TO THIS PRIVACY POLICY. PLEASE READ
            IT.
          </p>
        </div>

        <br />
        <div className="relative flex py-5 items-center w-full">
          {/*  Keep in Mind */}
          <div className="flex-grow border-t border-[#0000003c]" />
        </div>
        <div id="Main-Container">
          <div>
            <br />
            <h2 className="font-nunito mt-2 text-3xl font-bold tracking-tight text-[#5873FE]">
              Information We Collect From You
            </h2>
            <p className=" font-be mt-2">
              We collect the following types of personal information from users:
            </p>
            <h2 className="font-nunito mt-2 text-2xl font-bold tracking-tight text-gray-100">
              Information You Provide
            </h2>
            <p className=" font-be mt-2">
              To use the interviewing features and certain other features of the
              Service, you will need to register an account and provide certain
              personal information, such as your name and email address. In
              addition, when registering your account, you will have the option
              of providing certain additional information such as your
              educational details, Previous Experiences and current employer.
            </p>
            <h2 className="font-nunito mt-2 text-2xl font-bold tracking-tight text-gray-100">
              Information We Collect Automatically
            </h2>
            <p className=" font-be mt-2">
              In general, you may visit our website without telling us who you
              are or revealing any personal information about yourself. You may
              provide certain personal information if you register an account or
              to use the mock interviewing services or if you send email or
              other information to us as described below. Like many websites, we
              also collect information automatically that may be connected to
              you from the servers used to support the Service as described
              below.
            </p>
          </div>
          <div className="relative flex py-5  items-center w-full">
            <div className="flex-grow border-t border-[#0000003c]" />
          </div>
          <div>
            <h2 className="font-nunito mt-2 text-3xl font-bold tracking-tight text-[#5873FE]">
              How We Use and Share Your Information
            </h2>
            <p className=" font-be mt-2">
              We use the collected information for the following purposes:
            </p>
            <span className="flex mt-2  items-center">
              <ChevronsRight size={24} color="black" />
              <p className="text-black font-be ml-2">
                Scheduling mock interviews between interviewees and HR
                professionals.
              </p>
            </span>
            <span className="flex  items-center">
              <ChevronsRight size={24} color="black" />
              <p className="text-black font-be ml-2">
                Facilitating communication between interviewees and HR
                professionals.
              </p>
            </span>
            <span className="flex  items-center">
              <ChevronsRight size={24} color="black" />
              <p className="text-black font-be ml-2">
                Improving our services and user experience.
              </p>
            </span>
            <span className="flex  items-center">
              <ChevronsRight size={24} color="black" />
              <p className="text-black font-be ml-2">
                Complying with legal requirements.
              </p>
            </span>
          </div>
          <div className="relative flex py-5 items-center w-full">
            <div className="flex-grow border-t border-[#0000003c]" />
          </div>
          <div>
            <h2 className="font-nunito mt-2 text-3xl font-bold tracking-tight text-[#5873FE]">
              Children&apos;s Privacy
            </h2>
            <p className=" font-be mt-2">
              We are committed to complying with the Children&apos;s Online
              Privacy Protection Act (COPPA). Our Service is not directed to
              children under the age of 13. We do not knowingly collect personal
              information from children under the age of 13. If we receive
              personal information that we discover was provided by a child
              under the age of 13, we will promptly destroy such information.
              Schools and parents should supervise their children&apos;s online
              activities and consider the use of other means to provide a
              child-friendly, online environment. Additional information is
              available on the Direct Marketing Association&apos;s home page at
              http://thedma.org. If you would like to learn more about COPPA,
              visit the Federal Trade Commission home page at
              https://www.ftc.gov.
            </p>
          </div>
          <div className="relative flex py-5 items-center w-full">
            <div className="flex-grow border-t border-[#0000003c]" />
          </div>
          <div>
            <h2 className="font-nunito mt-2 text-3xl font-bold tracking-tight text-[#5873FE]">
              Links
            </h2>
            <p className=" font-be mt-2">
              Links to websites that are not operated by recruitersnexus.com are
              provided solely as a convenience to you. If you use these links,
              you will leave our website. This Privacy Policy does not apply to
              Third Party Sites. We have not reviewed the Third-Party sites and
              do not control and are not responsible for any of their content or
              their privacy policies, if any. We do not endorse or make any
              representations about them, or any information, software or other
              products or materials found there, or any results that may be
              obtained from using them. If you decide to access any of the
              Third-Party sites listed on our web site, you should understand
              that you do so at your own risk.
            </p>
          </div>
          <div className="relative flex py-5 items-center w-full">
            <div className="flex-grow border-t border-[#0000003c]" />
          </div>
          <div>
            <h2 className="font-nunito mt-2 text-3xl font-bold tracking-tight text-[#5873FE]">
              Transfer of Information Across National Borders
            </h2>
            <p className=" font-be mt-2">
              This Website is operated on servers in the Singapore. Where
              permitted by law and if required by applicable law, you expressly
              consent to the transfer of your personal information to, and the
              collection and processing of such personal information in the
              Singapore and other countries or territories where we or our
              vendors operate. In giving this consent, you acknowledge your
              understanding that the laws on holding, processing, using and
              transferring personal information in the Singapore may vary and be
              less protective of your privacy than laws of your state or
              country.
            </p>
          </div>
          <div className="relative flex py-5 items-center w-full">
            <div className="flex-grow border-t border-[#0000003c]" />
          </div>
          <div>
            <h2 className="font-nunito mt-2 text-3xl font-bold tracking-tight text-[#5873FE]">
              Data Security
            </h2>
            <p className=" font-be mt-2">
              We take appropriate measures to protect the security of
              users&apos; personal information. This includes implementing
              encryption, secure storage, and access controls to prevent
              unauthorized access or disclosure.
            </p>
          </div>
          <div className="relative flex py-5 items-center w-full">
            <div className="flex-grow border-t border-[#0000003c]" />
          </div>
          <div>
            <h2 className="font-nunito mt-2 text-3xl font-bold tracking-tight text-[#5873FE]">
              User Control
            </h2>
            <p className=" font-be mt-2">
              You have the right to access, update, or delete your personal
              information. You can manage your account settings or contact us
              directly for assistance with any privacy-related requests.
            </p>
          </div>
          <div className="relative flex py-5 items-center w-full">
            <div className="flex-grow border-t border-[#0000003c]" />
          </div>
          <div>
            <h2 className="font-nunito mt-2 text-3xl font-bold tracking-tight text-[#5873FE]">
              “Do not track” or “DNT” technology
            </h2>
            <p className=" font-be mt-2">
              The Service does not follow the direction of “do not track” or
              “DNT” settings that are available in some browsers.
            </p>
          </div>
          <div className="relative flex py-5 items-center w-full">
            <div className="flex-grow border-t border-[#0000003c]" />
          </div>
          <div>
            <h2 className="font-nunito mt-2 text-3xl font-bold tracking-tight text-[#5873FE]">
              Legal Compliance
            </h2>
            <p className=" font-be mt-2">
              We comply with relevant privacy laws and regulations, including
              the General Data Protection Regulation (GDPR) and the California
              Consumer Privacy Act (CCPA). If you have any questions or concerns
              about our privacy practices, please contact us at
              recruitersnexus@gmail.com .
            </p>
          </div>
          <div className="relative flex py-5 items-center w-full">
            <div className="flex-grow border-t border-[#0000003c]" />
          </div>
          <div>
            <h2 className="font-nunito mt-2 text-3xl font-bold tracking-tight text-[#5873FE]">
              Agreement
            </h2>
            <p className=" font-be mt-2">
              To the extent permitted by applicable law, by using this Service,
              you consent to the collection and use of your personal information
              as described above. If we decide to update our Privacy Policy, we
              will post any material changes at the top of this Privacy Policy.
            </p>
          </div>
          <div className="relative flex py-5 items-center w-full">
            <div className="flex-grow border-t border-[#0000003c]" />
          </div>
          <div>
            <h2 className="font-nunito mt-2 text-3xl font-bold tracking-tight text-[#5873FE]">
              Updates to Privacy Policy
            </h2>
            <p className=" font-be mt-2">
              If there are material changes to the Privacy Policy, we will
              prominently post such changes prior to implementing the change.
              Any information collected under our old Privacy Policy will be
              subject to the terms of our new Privacy Policy.
            </p>
          </div>
          <div className="relative flex py-5 items-center w-full">
            <div className="flex-grow border-t border-[#0000003c]" />
          </div>
        </div>
      </div>
    <Footer/>
    </>

  );
}
