import {useStarWarsSdk} from "sdk/hooks/useStarWarsSdk";

export interface StarWarsPerson {
  name: string;
  birth_year: string;
}

const useStarWarsPeopleSdk = () => {
  return useStarWarsSdk<StarWarsPerson>('people');
}

export { useStarWarsPeopleSdk }
