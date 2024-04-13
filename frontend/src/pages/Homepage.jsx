import React from "react";
import PageWrapper from "./PageWrapper";

function Homepage() {
  return (
    <PageWrapper className="items-center justify-center mt-0">
      <div className="flex flex-col items-center justify-center pointer-events-none">
        <p className="text-3xl -mb-3">Space</p>
        <p className="text-primary-500 text-4xl">Farm</p>
      </div>
    </PageWrapper>
  );
}

export default Homepage;
