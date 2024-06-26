import React, { useDebugValue, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CultivationForm from "../components/dataCreation/forms/CultivationForm";
import PageWrapper from "./PageWrapper";
import { useDataCreationContext } from "../context/general/DataCreationContext";
import CustomButton from "../components/general/CustomButton";
import PlantForm from "../components/dataCreation/forms/PlantForm";
import StageForm from "../components/dataCreation/forms/StageForm";
import HarvestForm from "../components/dataCreation/forms/HarvestForm";
import LoadingBar from "../components/general/LoadingBar";
import PersonForm from "../components/dataCreation/forms/PersonForm";
import CultivationTypeForm from "../components/dataCreation/forms/CultivationTypeForm";
import StageTypeForm from "../components/dataCreation/forms/StageTypeForm";
import MeasureUnitForm from "../components/dataCreation/forms/MeasureUnitForm";
import ControlForm from "../components/dataCreation/forms/ControlForm";
import ReadingForm from "../components/dataCreation/forms/ReadingForm";
import MeasuredValueForm from "../components/dataCreation/forms/MeasuredValueForm";
function DataCreationFormWrapper() {
  const { creationType } = useParams();
  const navigate = useNavigate();
  const { finishCreatingObject, isCreatingObject, isLoading } =
    useDataCreationContext();
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
      case "cultivationtype":
        setPageContent(<CultivationTypeForm />);
        break;
      case "stagetype":
        setPageContent(<StageTypeForm />);
        break;
      case "measureunit":
        setPageContent(<MeasureUnitForm />);
        break;
      case "measuredvalue":
        setPageContent(<MeasuredValueForm />);
        break;
      case "stage":
        setPageContent(<StageForm />);
        break;
      case "harvest":
        setPageContent(<HarvestForm />);
        break;
      case "worker":
        setPageContent(<PersonForm />);
        break;
      case "control":
        setPageContent(<ControlForm />);
        break;
      case "reading":
        setPageContent(<ReadingForm />);
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
          window.scrollTo(0, 0);
          finishCreatingObject();
        }}
      >
        <h1 className="text-2xl">Creating {creationType.toLowerCase()}</h1>
        {pageContent}
        {isLoading ? (
          <LoadingBar />
        ) : (
          <CustomButton type="submit" className={"mt-4"}>
            Create
          </CustomButton>
        )}
      </form>
    </PageWrapper>
  );
}
export default DataCreationFormWrapper;
