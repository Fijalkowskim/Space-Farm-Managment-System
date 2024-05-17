import React from "react";
import { usePersonContext } from "../../context/PersonContext";
import CustomButton from "../general/CustomButton";
import ProfileAttribute from "./ProfileAttribute";
function YourProfileSection() {
  const { logOut, userData } = usePersonContext();
  if (!userData) {
    return <div></div>;
  }
  return (
    <div className="w-full flex-wrap bg-background-950/50 p-4 rounded-md shadow-md text-text-50 flex flex-col items-center justify-center gap-3">
      <div className="w-full flex items-center md:justify-between justify-center gap-3 md:gap-0 flex-row flex-wrap">
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
      <div className="w-full flex-wrap flex flex-row items-center md:justify-start justify-center md:gap-14 gap-3">
        <ProfileAttribute label="Name" value={userData.name} />
        <ProfileAttribute label="Surname" value={userData.surname} />
        <ProfileAttribute label="Role" value={userData.role} />
        <CustomButton
          className={" w-40 md:ml-auto ml-0 leading-5"}
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
