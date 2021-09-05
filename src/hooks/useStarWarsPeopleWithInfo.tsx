import {
  StarWarsPerson,
  useStarWarsPeopleSdk
} from "sdk/hooks/starWarsPeople/useStarWarsPeopleSdk";
import {
  useCallback,
  useEffect
} from "react";
import {
  useStarWarsSdk,
  RequestInfo
} from "sdk/hooks/useStarWarsSdk";

type UseStarWarsPeopleWithInfo = () => [RequestInfo<StarWarsPerson>, () => void]

const useStarWarsPeopleWithInfo: UseStarWarsPeopleWithInfo = () => {
  const [, filmsDispatch]        = useStarWarsSdk('films');
  const [, starshipsDispatch]    = useStarWarsSdk('starships');
  const [, speciesDispatch]      = useStarWarsSdk('species');
  const [result, peopleDispatch] = useStarWarsPeopleSdk();

  const getAllInfo = useCallback(async () => {
    const [peopleData, filmsData, speciesData, starshipsData] = await Promise.all([
      peopleDispatch(),
      filmsDispatch(),
      speciesDispatch(),
      starshipsDispatch()
    ])

    peopleData?.forEach((person) => localStorage.setItem(`person_${person.url}`, JSON.stringify(person)));
    (filmsData as any[])?.forEach((film) => localStorage.setItem(`film_${film.url}`, JSON.stringify(film)));
    (speciesData as any[])?.forEach((species) => localStorage.setItem(`specie_${species.url}`, JSON.stringify(species)));
    (starshipsData as any[])?.forEach((starships) => localStorage.setItem(`starship_${starships.url}`, JSON.stringify(starships)));
  }, [filmsDispatch, peopleDispatch, speciesDispatch, starshipsDispatch])

  useEffect(() => {
    getAllInfo()
  }, [getAllInfo])

  return [result, getAllInfo];
}

export {useStarWarsPeopleWithInfo}
