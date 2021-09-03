import {
  useStarWarsPeopleSdk
} from "../sdk/hooks/starWarsPeople/useStarWarsPeopleSdk";
import {useEffect}            from "react";

const useStarWarsPeople = () => {
  const [result, dispatch] = useStarWarsPeopleSdk();

  useEffect(() => {
    dispatch();
  }, [dispatch])

  return result;
}

export { useStarWarsPeople }
