import { useState, useEffect } from "react";
export const useFetchData = (getMethod, id) => {
  const [data, setData] = useState();
  const [isPending, setIsPending] = useState(false);

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
    };
    loadData();
  }, [getMethod, id, setData, setIsPending]);

  return { data, isPending };
};
