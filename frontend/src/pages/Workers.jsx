import React from "react";
import PageWrapper from "./PageWrapper";
import CustomButton from "../components/general/CustomButton";
import VerticalScrollableDisplay from "../components/verticalScrollableDisplay/VerticalScrollableDisplay";
import { exampleWorkers } from "../exampleData/ExampleWorkers";
import { usePersonContext } from "../context/PersonContext";
import { useFetchArrayData } from "../hooks/useFetchArrayData";

function Workers() {
  const { getPersons } = usePersonContext();
  const { data, isPending } = useFetchArrayData(getPersons);
  return (
    <PageWrapper
      secured={true}
      className="max-h-[90vh] h-screen min-h-0 overflow-hidden flex flex-col items-center justify-start gap-4 p-4"
    >
      <CustomButton className="text-lg w-44">New worker</CustomButton>
      <VerticalScrollableDisplay
        header={"Workers"}
        entries={data}
        contentType={"worker"}
        className={"max-w-4xl"}
        loading={isPending}
      />
    </PageWrapper>
  );
}

export default Workers;
