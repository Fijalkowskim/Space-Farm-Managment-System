import { useState, useEffect } from "react";

export const useFetchArrayData = (
  getMethod,
  id,
  refreshData,
  setRefreshData
) => {
  const [data, setData] = useState();
  const [isPending, setIsPending] = useState(false);

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
      } catch (err) {
        console.log(err);
        setData([]);
      }
      setIsPending(false);
    };
    loadData();
  }, [refreshData, id]);

  return { data, isPending };
};
