
import React from "react";

import JobUser from "../dashboard/components/JobUser";
import ScrollToTopButton from "../comps/scrollTop";

export default function page() {
  return (
    <div className="bg-black">
     
      <div className="p-3 ">
        <JobUser />
      </div>
      <ScrollToTopButton />
    </div>
  );
}
