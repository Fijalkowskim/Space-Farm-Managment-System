import { useState, useEffect } from "react";

export const useFetchArrayData = (getMethod) => {
  const [data, setData] = useState();
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setIsPending(true);
      try {
        const loadedData = await getMethod();
        setData(loadedData);
      } catch (err) {
        console.log(err);
        setData([]);
      }
      setIsPending(false);
    };
    loadData();
  }, [getMethod, setData, setIsPending]);

  return { data, isPending };
};
