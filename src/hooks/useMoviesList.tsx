import {
  useEffect,
  useState
} from "react";

const useMoviesList = () => {
  const [movies, setMovies] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    setMovies(
      Object.keys(
        Object.assign({}, localStorage)
      )
        .filter((key) => /film/.test(key))
        .map((key) => JSON.parse(localStorage.getItem(key) ?? '{}'))
    )
  }, [])

  return movies;
}

export { useMoviesList }
