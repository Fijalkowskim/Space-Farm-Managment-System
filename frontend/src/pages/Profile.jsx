import React, { useEffect } from "react";
import { usePersonContext } from "../context/PersonContext";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { userData } = usePersonContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userData) return;
    navigate(`/worker/${userData.id}`);
  }, [userData, navigate]);
  return <></>;
}

export default Profile;
