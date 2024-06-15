import { useState, useEffect } from "react";
import { useGlobalReloadContext } from "../context/general/GlobalReloadContext";

export const useFetchArrayData = (
  getMethod,
  id,
  refreshData,
  setRefreshData
) => {
  const [data, setData] = useState();
  const [isPending, setIsPending] = useState(false);
  const { globalReload, setGlobalReload } = useGlobalReloadContext();

  useEffect(() => {
    const loadData = async () => {
      setIsPending(true);
      try {
        var loadedData;
        if (id !== undefined) {
          const parsedId = parseInt(id);
          loadedData = await getMethod(parsedId);
        } else {
          loadedData = await getMethod();
        }
        setData(loadedData);
        if (setRefreshData) setRefreshData(false);
        if (globalReload) setGlobalReload(false);
      } catch (err) {
        console.log(err);
        setData([]);
      }
      setIsPending(false);
    };
    loadData();
  }, [refreshData, id, globalReload]);

  return { data, isPending };
};
