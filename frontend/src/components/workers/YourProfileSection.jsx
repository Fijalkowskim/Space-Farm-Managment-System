import React, { useEffect, useState } from "react";
import { usePersonContext } from "../../context/PersonContext";
import CustomButton from "../general/CustomButton";
import ProfileAttribute from "./ProfileAttribute";
import Modal from "../general/Modal";
import ChangePasswordForm from "./ChangePasswordForm";
function ProfileSection({ worker }) {
  const { logOut, userData } = usePersonContext();
  const [isWorkerOwner, setIsWorkerOwner] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  useEffect(() => {
    if (!worker || !userData) return;
    setIsWorkerOwner(worker.id === userData.id);
  }, [worker, userData]);
  if (!worker || !userData) {
    return <div></div>;
  }
  return (
    <div className="w-full flex-wrap bg-background-950/50 p-4 rounded-md shadow-md text-text-50 flex flex-col items-center justify-center gap-3">
      <div className="w-full flex items-center md:justify-between justify-center gap-3 md:gap-0 flex-row flex-wrap">
        <h1 className="text-4xl">
          {isWorkerOwner ? "Your profile" : `Worker ${worker.id}`}
        </h1>
        <div>
          {isWorkerOwner && (
            <CustomButton
              className={"text-xl w-40"}
              onClick={() => {
                logOut();
              }}
            >
              Log out
            </CustomButton>
          )}
        </div>
      </div>
      <div className="w-full flex-wrap flex flex-row items-center md:justify-start justify-center md:gap-14 gap-3">
        <ProfileAttribute label="Name" value={worker.name} />
        <ProfileAttribute label="Surname" value={worker.surname} />
        <ProfileAttribute label="Role" value={worker.role} />
        {isWorkerOwner && (
          <CustomButton
            className={" w-40 md:ml-auto ml-0 leading-5"}
            variant="action"
            onClick={() => {
              setChangingPassword(true);
            }}
          >
            Change password
          </CustomButton>
        )}
      </div>
      <Modal
        visible={changingPassword}
        onClose={() => {
          setChangingPassword(false);
        }}
      >
        <ChangePasswordForm onSuccess={() => setChangingPassword(false)} />
      </Modal>
    </div>
  );
}

export default ProfileSection;
