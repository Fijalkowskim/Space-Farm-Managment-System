import React, { useEffect, useState } from "react";
import PageWrapper from "../PageWrapper";
import { useParams } from "react-router-dom";
import LoadingBar from "../../components/general/LoadingBar";
import { useFetchData } from "../../hooks/useFetchData";
import { usePersonContext } from "../../context/PersonContext";
import ProfileSection from "../../components/workers/YourProfileSection";
import AssignedCultivationsSection from "../../components/workers/AssignedCultivationsSection";

function WorkerDetails() {
  const { id } = useParams();
  const { getPerson } = usePersonContext();
  const { data, isPending } = useFetchData(getPerson, id);
  const [currentWorker, setCurrentWorker] = useState(undefined);

  useEffect(() => {
    setCurrentWorker(data);
  }, [data, setCurrentWorker]);

  return (
    <PageWrapper secured={true} className={"overflow-hidden h-[90vh] min-h-0"}>
      {currentWorker === undefined && !isPending ? (
        <div className="-mt-20 h-screen flex items-center justify-center">
          <h1 className="text-xl text-center">
            There is no Worker with given id.
          </h1>
        </div>
      ) : isPending ? (
        <LoadingBar variant={"fullPage"} />
      ) : (
        <div className="w-full max-w-4xl flex items-center justify-start flex-col gap-8 h-full">
          <ProfileSection worker={currentWorker} />
          <AssignedCultivationsSection />
        </div>
      )}
    </PageWrapper>
  );
}

export default WorkerDetails;
