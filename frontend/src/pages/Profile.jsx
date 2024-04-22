import React from "react";
import PageWrapper from "./PageWrapper";
import CustomButton from "../components/general/CustomButton";
import { useUserContext } from "../context/UserContext";

function Profile() {
  const { logOut } = useUserContext();
  return (
    <PageWrapper
      secured={true}
      className={"flex h-screen items-center justify-center"}
    >
      <CustomButton
        className={"text-xl"}
        onClick={() => {
          logOut();
        }}
      >
        Log out
      </CustomButton>
    </PageWrapper>
  );
}

export default Profile;
