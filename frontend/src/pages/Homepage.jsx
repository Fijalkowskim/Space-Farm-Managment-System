import React from "react";
import PageWrapper from "./PageWrapper";
import LoginPanel from "../components/loginPanel/LoginPanel";

function Homepage() {
  return (
    <PageWrapper className="items-center justify-between mt-0 flex-row gap-4 max-w-2xl mx-auto">
      <div className="flex flex-col items-center justify-center pointer-events-none text-center flex-shrink-0">
        <p className="text-5xl -mb-3">Space</p>
        <p className="text-primary-500 text-6xl">Farm</p>
        <p className="text-lg font-extralight tracking-tight">
          Managment System
        </p>
      </div>
      <LoginPanel onSubmit={(login, password) => {}} />
    </PageWrapper>
  );
}

export default Homepage;
