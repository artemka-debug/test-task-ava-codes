import {useStarWarsSdk} from "sdk/hooks/useStarWarsSdk";

export interface StarWarsPerson {
  name: string;
  birth_year: string;
  url: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[]
}

const useStarWarsPeopleSdk = () => {
  return useStarWarsSdk<StarWarsPerson>('people');
}

export { useStarWarsPeopleSdk }
