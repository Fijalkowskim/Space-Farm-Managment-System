import { useState, useEffect } from "react";
import { useGlobalReloadContext } from "../context/general/GlobalReloadContext";
export const useFetchData = (getMethod, id, retrigger, setRetrigger) => {
  const [data, setData] = useState();
  const [isPending, setIsPending] = useState(false);
  const { globalReload, setGlobalReload } = useGlobalReloadContext();
  useEffect(() => {
    const loadData = async () => {
      if (id === undefined) return;

      setIsPending(true);
      try {
        const parsedId = parseInt(id);
        const loadedData = await getMethod(parsedId);
        setData(loadedData);
      } catch (err) {
        console.log(err);
      }
      setIsPending(false);
      if (setRetrigger) setRetrigger(false);
      if (globalReload) setGlobalReload(false);
    };
    loadData();
  }, [id, retrigger, globalReload]);

  return { data, isPending };
};
