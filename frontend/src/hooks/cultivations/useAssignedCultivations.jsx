import { useState, useEffect } from "react";
import { useCultivationContext } from "../../context/cultivations/CultivationContext";
import { useUserContext } from "../../context/UserContext";
export const useAssignedCultivations = () => {
  const [cultivations, setCultivations] = useState();
  const [isPending, setIsPending] = useState(false);
  const { getAssignedCultivations } = useCultivationContext();
  const { userData } = useUserContext();

  useEffect(() => {
    const loadCultivation = async () => {
      if (!userData) {
        setCultivations([]);
        return;
      }
      setIsPending(true);
      try {
        const data = await getAssignedCultivations(userData.id);
        setCultivations(data);
      } catch (err) {
        console.log(err);
      }
      setIsPending(false);
    };
    loadCultivation();
  }, [getAssignedCultivations, setCultivations, setIsPending, userData]);

  return { cultivations, isPending };
};
