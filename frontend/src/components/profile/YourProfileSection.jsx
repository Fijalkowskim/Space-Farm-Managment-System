import React from "react";
import { useUserContext } from "../../context/UserContext";
import CustomButton from "../general/CustomButton";
import ProfileAttribute from "./ProfileAttribute";
function YourProfileSection() {
  const { logOut, userData } = useUserContext();
  if (!userData) {
    return <div></div>;
  }
  return (
    <div className="w-full max-w-6xl bg-background-950/50 p-4 rounded-md shadow-md text-text-50 flex flex-col items-center justify-center gap-3">
      <div className="w-full flex items-center justify-between flex-row">
        <h1 className="text-4xl">Your profile</h1>
        <div>
          <CustomButton
            className={"text-xl w-40"}
            onClick={() => {
              logOut();
            }}
          >
            Log out
          </CustomButton>
        </div>
      </div>
      <div className="w-full flex flex-row items-center justify-start gap-14">
        <ProfileAttribute label="Name" value={userData.name} />
        <ProfileAttribute label="Surname" value={userData.surname} />
        <ProfileAttribute label="Role" value={userData.role} />
        <CustomButton
          className={" w-40 ml-auto leading-5"}
          variant="action"
          onClick={() => {}}
        >
          Change password
        </CustomButton>
      </div>
    </div>
  );
}

export default YourProfileSection;
