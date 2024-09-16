
import Footer from "../comps/Footer";
import { ChevronsRight } from "lucide-react";

export default function ReturnPolicy() {
  return (
    <div>
      
      <div className=" py-20 flex flex-col justify-center items-center px-6 sm:px-12 lg:px-32">
        {/* <p className="text-base font-semibold leading-7 text-indigo-600">Deploy faster</p> */}
        <h1 className="font-nunito mt-2 text-3xl font-bold tracking-tight text-white sm:text-5xl">
          Return Policy
        </h1>
        <h1 className="font-nunito mt-2 text-lg font-bold tracking-tight text-white sm:text-4xl"></h1>
        <p className="font-be mt-6 text-xl leading-8 text-white">
          Effective Date: March 1, 2024
        </p>
        <p className="font-be mt-6 text-xl leading-8 text-gray-300">
          Recruiters Nexus is a platform designed for permitting engineers to
          participate in real and mock interviews with peers as well as
          individuals who hire engineers for another organizations.
        </p>
        <div className="flex justify-start w-full">
          <p className=" font-be mt-6 text-xl leading-8 text-gray-300">
            Therefore, We do not accept returns for any digital products or
            services purchased through the recruitersnexus.com. All sales are
            final.
          </p>
        </div>

        <br />
        <div className="relative flex py-5 items-center w-full">
          <div className="flex-grow border-t border-[#0000003c]" />
        </div>
        <div className="flex flex-col w-full" id="Main-Container">
          <div>
            <h2 className="font-nunito mt-2 text-3xl font-bold tracking-tight text-[#5873FE]">
              Digital Products
            </h2>
            <div className=" font-be mt-2">
              <span className="flex ">
                <div className="aspect-square">
                  <div className="aspect-square">
                    <ChevronsRight size={24} color="black" />
                  </div>
                </div>
                <p className="text-gray-300 font-be ml-2">
                  Our App offers digital products such as premium features,
                  access to exclusive content, or downloadable resources.
                </p>
              </span>{" "}
              <span className="flex ">
                <div className="aspect-square">
                  <div className="aspect-square">
                    <ChevronsRight size={24} color="black" />
                  </div>
                </div>
                <p className="text-gray-300 font-be ml-2">
                  Once a digital product is purchased, it is instantly
                  accessible to the user, making returns impractical and not
                  feasible.
                </p>
              </span>
            </div>
          </div>
          <div className="relative flex py-5 items-center w-full">
            <div className="flex-grow border-t border-[#0000003c]" />
          </div>
          <div>
            <h2 className="font-nunito mt-2 text-3xl font-bold tracking-tight text-[#5873FE]">
              No Return Policy
            </h2>
            <div className=" font-be mt-2">
              <span className="flex ">
                <div className="aspect-square">
                  <div className="aspect-square">
                    <ChevronsRight size={24} color="black" />
                  </div>
                </div>
                <p className="text-gray-300 font-be ml-2">
                  Our digital products are delivered electronically and
                  automatically upon successful payment. This means you can
                  access and use them immediately. Due to the instantaneous
                  delivery of digital products upon purchase, we do not accept
                  returns for any reason.
                </p>
              </span>{" "}
              <span className="flex ">
                <div className="aspect-square">
                  <div className="aspect-square">
                    <ChevronsRight size={24} color="black" />
                  </div>
                </div>
                <p className="text-gray-300 font-be ml-2">
                  Because the products are digital, we cannot guarantee they
                  haven&apso;t been downloaded or used after purchase. Unlike
                  physical products, there&apso;s no way to retrieve them once
                  delivered.
                </p>
              </span>
              <span className="flex ">
                <div className="aspect-square">
                  <div className="aspect-square">
                    <ChevronsRight size={24} color="black" />
                  </div>
                </div>
                <p className="text-gray-300 font-be ml-2">
                  By completing a purchase of a digital product through the
                  recruitersnexus.com , you acknowledge and agree to our
                  no-return policy.
                </p>
              </span>
            </div>
          </div>
          <div className="relative flex py-5 items-center w-full">
            <div className="flex-grow border-t border-[#0000003c]" />
          </div>
          <div>
            <h2 className="font-nunito mt-2 text-3xl font-bold tracking-tight text-[#5873FE]">
              Exceptional Circumstances
            </h2>
            <div className=" font-be mt-2">
              <span className="flex ">
                <div className="aspect-square">
                  <div className="aspect-square">
                    <ChevronsRight size={24} color="black" />
                  </div>
                </div>
                <p className="text-gray-300 font-be ml-2">
                  In the unlikely event of technical issues or errors preventing
                  access to purchased digital products, please contact our
                  customer support team immediately for assistance.
                </p>
              </span>{" "}
              <span className="flex ">
                <div className="aspect-square">
                  <div className="aspect-square">
                    <ChevronsRight size={24} color="black" />
                  </div>
                </div>
                <p className="text-gray-300 font-be ml-2">
                  We will investigate and address the issue promptly to ensure
                  you receive the intended digital product or appropriate
                  resolution.
                </p>
              </span>
            </div>
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
