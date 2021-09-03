import {
  useCallback,
  useMemo,
  useState
} from "react";
import StarWarsSdk from "../starWarsSdk";

export enum RequestStatus {
  Loading = 'loading',
  Error = 'error',
  Loaded = 'loaded',
  NotUsed = 'not_used',
}

type RequestResult<T extends any> = T[] | null;

type RequestInfo<T> = {
  result: RequestResult<T>;
  status: RequestStatus;
  error: string | null;
}

type UseStarWarsSdk<T extends any> = [RequestInfo<T>, (id?: string) => Promise<RequestResult<T>>];

const useStarWarsSdk = <T extends any>(resourceName: string): UseStarWarsSdk<T> => {
  const starWarsSdk = useMemo(() => new StarWarsSdk<T>(resourceName), [resourceName]);
  const [requestInfo, setRequestInfo] = useState<RequestInfo<T>>({
    result: null,
    status: RequestStatus.NotUsed,
    error: null
  });

  const dispatch = useCallback(async (id?: string): Promise<RequestResult<T>> => {
    try {
      setRequestInfo((prevState) => ({
        ...prevState,
        status: RequestStatus.Loading
      }))

      const response = await (id ? starWarsSdk.getPersonById(id) : starWarsSdk.getPeople());
      const result: T[] = !Array.isArray(response) ? [response] : response;

      setRequestInfo((prevState) => ({
        ...prevState,
        result,
      }))
      return result;
    } catch (e: any) {
      setRequestInfo({
        result: null,
        error: e.message,
        status: RequestStatus.Error
      })
      return null;
    }
    finally {
      setRequestInfo((prevState) => ({
        ...prevState,
        status: RequestStatus.Loaded
      }))
    }
  }, [])

  return [requestInfo, dispatch]
}

export { useStarWarsSdk }
