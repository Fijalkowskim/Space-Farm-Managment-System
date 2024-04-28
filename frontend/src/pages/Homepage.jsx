import React, { useEffect } from "react";
import PageWrapper from "./PageWrapper";
import LoginPanel from "../components/loginPanel/LoginPanel";

function Homepage() {
  return (
    <PageWrapper
      secured={false}
      className="md:h-screen h-auto items-center justify-center md:justify-between mt-0 flex-col gap-4 max-w-2xl mx-auto md:flex-row"
    >
      <div className="flex flex-col items-center justify-center pointer-events-none text-center flex-shrink-0">
        <p className="md:text-5xl text-3xl -mb-3">Space</p>
        <p className="text-primary-500 md:text-6xl text-4xl">Farm</p>
        <p className="md:block hidden text-lg font-extralight tracking-tight">
          Managment System
        </p>
      </div>
      <LoginPanel />
    </PageWrapper>
  );
}

export default Homepage;
