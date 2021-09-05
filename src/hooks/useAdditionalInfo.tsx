import {ADDITIONAL_STAR_WARS_PERSON_INFO_NAMES} from "../constants";
import {
  useEffect,
  useState
}                                               from "react";

const useAdditionalInfo = (
  name: typeof ADDITIONAL_STAR_WARS_PERSON_INFO_NAMES[number],
  urlList: string[],
) => {
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const getAdditionalInfo = async () => {
      setResults(urlList.map((url) => JSON.parse(localStorage.getItem(`${name}_${url}`) ?? '{}')))
    }

    getAdditionalInfo();
  }, [name, urlList])

  return results;
}

export {useAdditionalInfo}
