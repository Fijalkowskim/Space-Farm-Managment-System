import React, { useEffect, useState } from "react";
import PageWrapper from "../PageWrapper";
import { useParams } from "react-router-dom";
import LoadingBar from "../../components/general/LoadingBar";
import PlantCultivationsDisplay from "../../components/plants/PlantCultivationsDisplay";
import { useFetchData } from "../../hooks/useFetchData";
import { usePlantContext } from "../../context/dictionaries/PlantContext";

function PlantDetails() {
  const { id } = useParams();
  const { getPlant } = usePlantContext();
  const { data, isPending } = useFetchData(getPlant, id);
  const [currentPlant, setCurrentPlant] = useState(undefined);

  useEffect(() => {
    setCurrentPlant(data);
    console.log(data);
  }, [data, setCurrentPlant]);

  return (
    <PageWrapper secured={true} className={"h-fit min-h-0"}>
      {currentPlant === undefined && !isPending ? (
        <div className="-mt-20 h-screen flex items-center justify-center">
          <h1 className="text-xl text-center">
            There is no plant with given id.
          </h1>
        </div>
      ) : isPending ? (
        <LoadingBar variant={"fullPage"} />
      ) : (
        <div className="w-full flex flex-col items-center justify-start gap-3 relative">
          <h1 className="text-4xl mt-2">Plant {currentPlant.id}</h1>
          <PlantCultivationsDisplay plant={currentPlant} />
        </div>
      )}
    </PageWrapper>
  );
}

export default PlantDetails;
