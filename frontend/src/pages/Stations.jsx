import React from "react";
import PageWrapper from "./PageWrapper";
import CustomButton from "../components/general/CustomButton";
import VertivalScrollableDisplay from "../components/verticalScrollableDisplay/VertivalScrollableDisplay";
import { exampleStations } from "../exampleData/ExampleStations";
import { useStationContext } from "../context/StationContext";
import { useFetchArrayData } from "../hooks/useFetchArrayData";
function Stations() {
  const { getStations } = useStationContext();
  const { data, isPending } = useFetchArrayData(getStations);
  return (
    <PageWrapper
      secured={true}
      className="max-h-[90vh] h-screen min-h-0 overflow-hidden flex flex-col items-center justify-start gap-4 p-4"
    >
      <CustomButton className="text-lg w-44">New station</CustomButton>
      <VertivalScrollableDisplay
        header={"Stations"}
        entries={data}
        contentType={"station"}
        className={"max-w-4xl"}
        loading={isPending}
      />
    </PageWrapper>
  );
}

export default Stations;
