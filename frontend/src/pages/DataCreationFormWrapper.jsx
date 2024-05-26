import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import CultivationForm from "../components/dataCreation/CultivationForm";

function DataCreationFormWrapper() {
  const { creationType } = useParams();
  const navigate = useNavigate();
  {
    switch (creationType.toLowerCase()) {
      case "cultivation":
        return <CultivationForm />;
      default:
        navigate("/");
    }
  }
  return <></>;
}
export default DataCreationFormWrapper;
