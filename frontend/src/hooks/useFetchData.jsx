import { useState, useEffect } from "react";
export const useFetchData = (getMethod, id, retrigger, setRetrigger) => {
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
      if (setRetrigger) setRetrigger(false);
    };
    loadData();
  }, [id, retrigger]);

  return { data, isPending };
};
