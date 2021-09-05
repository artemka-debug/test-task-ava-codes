import {
  useEffect,
  useState
} from "react";

const useSpeciesList = () => {
  const [species, setSpecies] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    setSpecies(
      Object.keys(
        Object.assign({}, localStorage)
      )
        .filter((key) => /specie/.test(key))
        .map((key) => JSON.parse(localStorage.getItem(key) ?? '{}'))
    )
  }, [])

  return species;
}

export { useSpeciesList }
