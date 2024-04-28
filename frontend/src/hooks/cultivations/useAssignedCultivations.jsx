import { useState, useEffect } from "react";
import { useCultivationContext } from "../../context/CultivationContext";
export const useAssignedCultivations = () => {
  const [cultivations, setCultivations] = useState();
  const [isPending, setIsPending] = useState(false);
  const { getAssignedCultivations } = useCultivationContext();

  useEffect(() => {
    const loadCultivation = async () => {
      setIsPending(true);
      try {
        const data = await getAssignedCultivations();
        setCultivations(data);
      } catch (err) {
        console.log(err);
      }
      setIsPending(false);
    };
    loadCultivation();
  }, [getAssignedCultivations, setCultivations, setIsPending]);

  return { cultivations, isPending };
};
