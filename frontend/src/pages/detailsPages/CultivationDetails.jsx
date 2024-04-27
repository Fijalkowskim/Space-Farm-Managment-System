import React, { useEffect, useState } from "react";
import PageWrapper from "../PageWrapper";
import { useParams } from "react-router-dom";
import { useCultivationContext } from "../../context/CultivationContext";

function CultivationDetails() {
  const { id } = useParams();
  const { getCultivation } = useCultivationContext();
  const [cultivation, setCultivation] = useState(undefined);

  useEffect(() => {
    const loadCultivation = async () => {
      try {
        const cultivationId = parseInt(id);
        const data = await getCultivation(cultivationId);
        setCultivation(data);
      } catch (err) {
        console.log(err);
      }
    };
    loadCultivation();
  }, [getCultivation, setCultivation, id]);

  return (
    <PageWrapper secured={true}>
      {cultivation === undefined ? (
        <div className="h-screen flex items-center justify-center">
          <h1 className="text-xl text-center">
            There is no cultivation with given id.
          </h1>
        </div>
      ) : (
        <>Cultivation {id}</>
      )}
    </PageWrapper>
  );
}

export default CultivationDetails;
