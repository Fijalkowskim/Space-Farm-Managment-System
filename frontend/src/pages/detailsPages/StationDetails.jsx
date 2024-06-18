import React, { useEffect, useState } from "react";
import PageWrapper from "../PageWrapper";
import { useParams } from "react-router-dom";
import LoadingBar from "../../components/general/LoadingBar";
import { useStation } from "../../hooks/stations/useStation";
import StationCultivationsDisplay from "../../components/stations/StationCultivationsDisplay";
import { useFetchData } from "../../hooks/useFetchData";
import { useStationContext } from "../../context/StationContext";
import { useCultivationContext } from "../../context/cultivations/CultivationContext";
import { useFetchArrayData } from "../../hooks/useFetchArrayData";
import VerticalScrollableDisplay from "../../components/verticalScrollableDisplay/VerticalScrollableDisplay";

function StationDetails() {
  const { id } = useParams();
  const { getStation } = useStationContext();
  const { data, isPending } = useFetchData(getStation, id);
  const [currentStation, setCurrentStation] = useState(undefined);

  const { getByStation } = useCultivationContext();
  const { data: cultivations, isPending: cultivationsPending } =
    useFetchArrayData(getByStation, id);

  useEffect(() => {
    setCurrentStation(data);
    console.log(data);
  }, [data, setCurrentStation]);

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
          <div className="w-full p-2 flex flex-col items-center justify-start bg-background-950/50 h-[30rem] max-w-4xl">
            <VerticalScrollableDisplay
              header={"Assigned cultivations"}
              entries={cultivations}
              isPending={cultivationsPending}
              contentType={"cultivation"}
              className={""}
              detailsPageDisplay={true}
            />
          </div>
        </div>
      )}
    </PageWrapper>
  );
}

export default StationDetails;
