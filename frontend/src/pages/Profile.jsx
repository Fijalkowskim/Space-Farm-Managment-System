import React from "react";
import PageWrapper from "./PageWrapper";

import YourProfileSection from "../components/profile/YourProfileSection";

function Profile() {
  return (
    <PageWrapper
      secured={true}
      className={"flex h-screen items-center justify-start flex-col"}
    >
      <YourProfileSection />
    </PageWrapper>
  );
}

export default Profile;
