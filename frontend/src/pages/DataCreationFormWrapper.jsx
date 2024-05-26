import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CultivationForm from "../components/dataCreation/CultivationForm";
import { ObjectCreationData } from "../models/dataCreation/ObjectCreationData";
import { CultivationCreateRequest } from "../models/requestmodels/CultivationCreateRequest";
import { useCultivationContext } from "../context/cultivations/CultivationContext";
import { useDataCreationContext } from "../context/general/DataCreationContext";
import PageWrapper from "./PageWrapper";

function DataCreationFormWrapper() {
  const { creationType } = useParams();
  const navigate = useNavigate();
  const { startCreatingObject } = useDataCreationContext();

  const { addCultivation } = useCultivationContext();

  const [pageContent, setPageContent] = useState({
    content: undefined,
    label: "",
  });

  useEffect(() => {
    switch (creationType.toLowerCase()) {
      case "cultivation":
        setPageContent({
          content: <CultivationForm />,
          label: "cultivation",
        });
        startCreatingObject(
          new CultivationCreateRequest(),
          addCultivation,
          "/",
          "cultivation"
        );
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
      <form className="flex flex-col gap-4 items-center justify-center w-full max-w-4xl p-2 h-full bg-background-950/80">
        <h1 className="text-2xl">Creating {pageContent.label.toLowerCase()}</h1>
        {pageContent.content}
      </form>
    </PageWrapper>
  );
}
export default DataCreationFormWrapper;
