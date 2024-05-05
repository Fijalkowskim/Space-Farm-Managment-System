import React, { useEffect, useState } from "react";
import PageWrapper from "../PageWrapper";
import { useParams } from "react-router-dom";
import LoadingBar from "../../components/general/LoadingBar";
import { useStation } from "../../hooks/stations/useStation";

function StationDetails() {
  const { id } = useParams();
  const { station, isPending } = useStation(id);
  const [currentStation, setCurrentStation] = useState(undefined);

  useEffect(() => {
    setCurrentStation(station);
  }, [station, setCurrentStation]);

  return (
    <PageWrapper secured={true} className={"h-fit min-h-0"}>
      {currentStation === undefined && !isPending ? (
        <div className="-mt-20 h-screen flex items-center justify-center">
          <h1 className="text-xl text-center">
            There is no station with given id.
          </h1>
        </div>
      ) : isPending ? (
        <LoadingBar variant={"fullPage"} />
      ) : (
        <div className="w-full flex flex-col items-center justify-start gap-3 relative">
          <h1 className="text-4xl mt-2">Station {currentStation.id}</h1>
        </div>
      )}
    </PageWrapper>
  );
}

export default StationDetails;
