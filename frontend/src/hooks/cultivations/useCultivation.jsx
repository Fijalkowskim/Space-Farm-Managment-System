import { useState, useEffect } from "react";
import { useCultivationContext } from "../../context/cultivations/CultivationContext";
export const useCultivation = (id) => {
  const [cultivation, setCultivation] = useState();
  const [isPending, setIsPending] = useState(false);
  const { getCultivation } = useCultivationContext();

  useEffect(() => {
    const loadCultivation = async () => {
      setIsPending(true);
      try {
        const cultivationId = parseInt(id);
        const data = await getCultivation(cultivationId);
        setCultivation(data);
      } catch (err) {
        console.log(err);
      }
      setIsPending(false);
    };
    loadCultivation();
  }, [getCultivation, setCultivation, id, setIsPending]);

  return { cultivation, isPending };
};
