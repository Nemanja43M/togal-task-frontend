import { useCallback, useState } from "react";

import { AxiosResponse } from "axios";

type RequestFunction<T> = () => Promise<AxiosResponse<T>>;

export const useAsyncService = <T>() => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<T | undefined>(undefined);

  const fetchData = useCallback(async (request: RequestFunction<T>) => {
    try {
      setIsLoading(true);
      const response = await request();
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  }, []);

  return { isLoading, isError, data, fetchData };
};
