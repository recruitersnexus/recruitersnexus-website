
import Footer from "../comps/Footer";
import { ChevronsRight } from "lucide-react";
import Link from "next/link";

export default function RefundPolicy() {
  return (
    <div>
      <div className=" py-20 flex flex-col justify-center items-center px-6 sm:px-12 lg:px-32">
        {/* <p className="text-base font-semibold leading-7 text-indigo-600">Deploy faster</p> */}
        <h1 className="font-nunito mt-2 text-3xl font-bold tracking-tight text-white sm:text-5xl">
          Refund Policy
        </h1>
        <h1 className="font-nunito mt-2 text-lg font-bold tracking-tight text-white sm:text-4xl"></h1>
        <p className="font-be mt-6 text-xl leading-8 text-white">
          Effective Date: March 1, 2024
        </p>
        <p className="font-be mt-6 text-xl leading-8 text-gray-300">
          Recruiters Nexus is a platform designed to facilitate individuals from
          various sectors and organizations worldwide, allowing them to engage
          in real and mock interviews with peers and potential candidates. We do
          not offer refunds for any digital products or services purchased
          through the App. All sales are final.
        </p>
        <div className="flex justify-start w-full">
          <p className=" font-be mt-6 text-xl leading-8 text-gray-300">
            Digital Products Our App may offer digital products such as premium
            features or access to exclusive content. Once a digital product is
            purchased, it is immediately accessible to the user, and therefore
            cannot be returned or refunded. No Refund Policy Due to the nature
            of digital products and the instant access provided upon purchase,
            we do not offer refunds under any circumstances. By purchasing a
            digital product through the App, you acknowledge and agree to our
            no-refund policy.
          </p>
        </div>

      
      </div>
      <Footer />
    </div>
  );
}
