import {ADDITIONAL_STAR_WARS_PERSON_INFO_NAMES} from "../constants";
import {useStarWarsSdk}                         from "../sdk/hooks/useStarWarsSdk";
import {
  useEffect,
  useState
}                                               from "react";
import {
  first,
  last
}                                               from "utils";

const useAdditionalInfo = (
  name: typeof ADDITIONAL_STAR_WARS_PERSON_INFO_NAMES[number],
  urlList: string[],
) => {
  const [{
    error,
    status
  }, dispatch] = useStarWarsSdk(name);
  const [results, setResults] = useState<null | unknown[]>(null);
  const getIdsFromUrls = (urlList: string[]) => urlList
    .map((url) =>
      last(url.replace(/\//ig, ' ').trim().split(' '))
    )


  useEffect(() => {
    const getAdditionalInfo = async () => {
      const ids = getIdsFromUrls(urlList);
      setResults(
        (await Promise.all(ids.map((id) => dispatch(id))))
          .map((infos) => infos && first<any>(infos)?.data)
      )
    }

    getAdditionalInfo();
  }, [dispatch, urlList])

  return {error, status, results}
}

export {useAdditionalInfo}
