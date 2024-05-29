import React, { useDebugValue, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CultivationForm from "../components/dataCreation/CultivationForm";
import PageWrapper from "./PageWrapper";
import { useDataCreationContext } from "../context/general/DataCreationContext";
import CustomButton from "../components/general/CustomButton";
function DataCreationFormWrapper() {
  const { creationType } = useParams();
  const navigate = useNavigate();
  const { finishCreatingObject, isCreatingObject } = useDataCreationContext();
  const [pageContent, setPageContent] = useState({
    content: undefined,
    label: "",
  });
  useEffect(() => {
    if (!isCreatingObject) {
      navigate("/");
    }
  }, []);
  useEffect(() => {
    switch (creationType.toLowerCase()) {
      case "cultivation":
        setPageContent({
          content: <CultivationForm />,
          label: "cultivation",
        });
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
        <h1 className="text-2xl">Creating {pageContent.label.toLowerCase()}</h1>
        {pageContent.content}
        <CustomButton type="submit" className={"mt-4"}>
          Create
        </CustomButton>
      </form>
    </PageWrapper>
  );
}
export default DataCreationFormWrapper;
