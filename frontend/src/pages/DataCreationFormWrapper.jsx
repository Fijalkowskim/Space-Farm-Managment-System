import React, { useDebugValue, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CultivationForm from "../components/dataCreation/CultivationForm";
import PageWrapper from "./PageWrapper";
import { useDataCreationContext } from "../context/general/DataCreationContext";
import CustomButton from "../components/general/CustomButton";
import PlantForm from "../components/dataCreation/PlantForm";
function DataCreationFormWrapper() {
  const { creationType } = useParams();
  const navigate = useNavigate();
  const { finishCreatingObject, isCreatingObject } = useDataCreationContext();
  const [pageContent, setPageContent] = useState();
  useEffect(() => {
    if (!isCreatingObject) {
      navigate("/");
    }
  }, []);
  useEffect(() => {
    switch (creationType.toLowerCase()) {
      case "cultivation":
        setPageContent(<CultivationForm />);
        break;
      case "plant":
        setPageContent(<PlantForm />);
        break;
      default:
        navigate("/");
    }
  }, [creationType]);

  return (
    <PageWrapper
      secured={true}
      className="flex flex-col items-center justify-start gap-4"
    >
      <form
        className="flex flex-col gap-2 items-center justify-center w-full max-w-4xl p-2 h-full bg-background-950/80"
        onSubmit={(e) => {
          e.preventDefault();
          finishCreatingObject();
        }}
      >
        <h1 className="text-2xl">Creating {creationType.toLowerCase()}</h1>
        {pageContent}
        <CustomButton type="submit" className={"mt-4"}>
          Create
        </CustomButton>
      </form>
    </PageWrapper>
  );
}
export default DataCreationFormWrapper;
