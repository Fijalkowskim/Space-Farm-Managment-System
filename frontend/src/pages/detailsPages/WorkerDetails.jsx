import React, { useEffect, useState } from "react";
import PageWrapper from "../PageWrapper";
import { useParams } from "react-router-dom";
import LoadingBar from "../../components/general/LoadingBar";
import { useFetchData } from "../../hooks/useFetchData";
import { usePersonContext } from "../../context/PersonContext";

function WorkerDetails() {
  const { id } = useParams();
  const { getPerson } = usePersonContext();
  const { data, isPending } = useFetchData(getPerson, id);
  const [currentWorker, setCurrentWorker] = useState(undefined);

  useEffect(() => {
    setCurrentWorker(data);
    console.log(data);
  }, [data, setCurrentWorker]);

  return (
    <PageWrapper secured={true} className={"h-fit min-h-0"}>
      {currentWorker === undefined && !isPending ? (
        <div className="-mt-20 h-screen flex items-center justify-center">
          <h1 className="text-xl text-center">
            There is no Worker with given id.
          </h1>
        </div>
      ) : isPending ? (
        <LoadingBar variant={"fullPage"} />
      ) : (
        <div className="w-full flex flex-col items-center justify-start gap-3 relative">
          <h1 className="text-4xl mt-2">Worker {currentWorker.id}</h1>
        </div>
      )}
    </PageWrapper>
  );
}

export default WorkerDetails;
