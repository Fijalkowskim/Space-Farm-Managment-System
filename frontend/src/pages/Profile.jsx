import React from "react";
import PageWrapper from "./PageWrapper";

import YourProfileSection from "../components/profile/YourProfileSection";
import AssignedCultivationsSection from "../components/profile/AssignedCultivationsSection";

function Profile() {
  return (
    <PageWrapper
      secured={true}
      className={
        "flex items-center justify-start flex-col gap-8 min-h-0 h-[90vh] overflow-hidden"
      }
    >
      <YourProfileSection />
      <AssignedCultivationsSection />
    </PageWrapper>
  );
}

export default Profile;
