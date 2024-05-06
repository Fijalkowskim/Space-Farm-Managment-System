import { useState, useEffect } from "react";
export const useFetchData = (getMethod, id) => {
  const [data, setData] = useState();
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setIsPending(true);
      try {
        const parsedId = parseInt(id);
        const loadedData = await getMethod();
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
