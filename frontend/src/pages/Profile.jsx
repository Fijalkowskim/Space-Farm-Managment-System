import React from "react";
import PageWrapper from "./PageWrapper";

import YourProfileSection from "../components/profile/YourProfileSection";
import AssignedCultivationsSection from "../components/profile/AssignedCultivationsSection";

function Profile() {
  return (
    <PageWrapper secured={true} className={"overflow-hidden h-[90vh] min-h-0"}>
      <div className="w-full max-w-4xl flex items-center justify-start flex-col gap-8 h-full">
        <YourProfileSection />
        <AssignedCultivationsSection />
      </div>
    </PageWrapper>
  );
}

export default Profile;
