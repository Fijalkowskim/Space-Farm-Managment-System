import React from "react";
import PageWrapper from "./PageWrapper";
import VerticalScrollableDisplay from "../components/verticalScrollableDisplay/VerticalScrollableDisplay";
import { useMeasuredValueContext } from "../context/MeasuredValueContext";
import { useFetchArrayData } from "../hooks/useFetchArrayData";
function MeasuredValues() {
  const { getMeasuredValues } = useMeasuredValueContext();
  const { data, isPending } = useFetchArrayData(getMeasuredValues);
  return (
    <PageWrapper
      secured={true}
      className="max-h-[90vh] h-screen min-h-0 overflow-hidden flex flex-col items-center justify-start gap-4 p-4"
    >
      <VerticalScrollableDisplay
        header={"MeasuredValues"}
        entries={data}
        contentType={"measuredValue"}
        className={"max-w-4xl"}
        loading={isPending}
        disableNavigation={true}
      />
    </PageWrapper>
  );
}

export default MeasuredValues;
