import { useState, useEffect } from "react";
import { useStationContext } from "../../context/StationContext";
export const useStation = (id) => {
  const [station, setStation] = useState();
  const [isPending, setIsPending] = useState(false);
  const { getStation } = useStationContext();

  useEffect(() => {
    const loadStation = async () => {
      setIsPending(true);
      try {
        const stationId = parseInt(id);
        const data = await getStation(stationId);
        setStation(data);
      } catch (err) {
        console.log(err);
      }
      setIsPending(false);
    };
    loadStation();
  }, [getStation, setStation, id, setIsPending]);

  return { station, isPending };
};
