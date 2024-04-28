import { useState, useEffect } from "react";
import { useCultivationContext } from "../../context/cultivations/CultivationContext";
export const useCultivations = () => {
  const [finishedCultivations, setFinishedCultivations] = useState();
  const [activeCultivations, setActiveCultivations] = useState();
  const [isPending, setIsPending] = useState(false);
  const { getFinishedCultivations, getActiveCultivations } =
    useCultivationContext();

  useEffect(() => {
    const loadCultivation = async () => {
      setIsPending(true);
      try {
        const finished = await getFinishedCultivations();
        const active = await getActiveCultivations();
        setFinishedCultivations(finished);
        setActiveCultivations(active);
      } catch (err) {
        console.log(err);
      }
      setIsPending(false);
    };
    loadCultivation();
  }, [
    getFinishedCultivations,
    getActiveCultivations,
    setActiveCultivations,
    setFinishedCultivations,
    setIsPending,
  ]);

  return { finishedCultivations, activeCultivations, isPending };
};
