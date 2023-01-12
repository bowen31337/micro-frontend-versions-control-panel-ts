import { useState, useEffect } from "react";
import { fetchJson } from "../mfe/utils";

export const useFetchJson = (path:string) => {
  const [loading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  const fetchData = () => {
    fetchJson(path).then((json) => {
      setData(json);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading };
};

export const useFetchJsons = (paths:string[]) => {
  const [loading, setIsLoading] = useState(true);
  const [data, setData] = useState<null | string[]>(null);

  const fetchData = () => {
    Promise.all(
      paths.map((path) =>
        fetchJson(path)
      )
    )
      .then((values) => setData(values))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading };
};
