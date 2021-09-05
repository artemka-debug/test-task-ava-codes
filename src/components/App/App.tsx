import 'components/App/index.css'
import {useStarWarsPeopleWithInfo} from "hooks/useStarWarsPeopleWithInfo";
import {RequestStatus}             from "sdk/hooks/useStarWarsSdk";
import {
  useEffect,
  useState
} from "react";
import {StarWarsPerson}            from "sdk/hooks/starWarsPeople/useStarWarsPeopleSdk";
import StarWarsPersonInfoModal     from "components/StarWarsPersonInfoModal/StarWarsPersonInfoModal";
import Filters                     from "components/Filters/Filters";
import Favorites                   from "components/Favorites/Favorites";

export type FilterDateRange = { startDate?: number, endDate?: number }
export interface Filter {
  movies: string[];
  species: string[];
  date: FilterDateRange
}

const App = () => {
  const [{
    result,
    error,
    status
  }, refetch]                               = useStarWarsPeopleWithInfo();
  const [currentFilter, setCurrentFilter]   = useState<Filter>({
    movies: [],
    species: [],
    date: {}
  });
  const [selectedPerson, setSelectedPerson] = useState<StarWarsPerson | null>(null);

  const filterPeople = (people: StarWarsPerson[] | null) => {
    if (!people) return [];

    const { movies, species, date } = currentFilter;
    let result = people;
    console.log(people);

    if (movies.length !== 0) {
      result = result
        .filter((person) =>
          movies.every((movie) => person.films.includes(movie))
        )
    }

    if (species.length !== 0) {
      result = result
        .filter((person) =>
          species.every((specie) => person.species.includes(specie))
        )
    }

    if (date.startDate) {
      const startDate = date.startDate * -1;
      result = result.filter((person) => {
        const slicedBirthYear = person.birth_year.slice(0, 3);
        if (isNaN(+slicedBirthYear)) return false;
        return +slicedBirthYear > startDate
      })
    }

    if (date.endDate) {
      const endDate = date.endDate;
      result = result.filter((person) => {
        const slicedBirthYear = person.birth_year.slice(0, 3);
        if (isNaN(+slicedBirthYear)) return false;
        return +slicedBirthYear < endDate
      })
    }

    return result;
  }

  const onFilterChange = (newFilter: Filter) => {
    setCurrentFilter(newFilter)
  }

  useEffect(() => {
    console.log(currentFilter);
    refetch()
  }, [currentFilter])

  return <main className="main">
    {
      status === RequestStatus.Loading ?
        <h1>Loading Star Wars People List...</h1> :
        error ? <h1 color="red">{error}</h1> :
          <>
            <Filters className="card" onFiltersChange={onFilterChange} filter={currentFilter} />
            <div className="card">
              <h1>Star Wars People List</h1>
              {filterPeople(result).map((person) => (
                <div className="person-card"
                     key={person.name}
                     onClick={() => setSelectedPerson(person)}
                >
                  {person.name}
                </div>
              ))}
              {selectedPerson && <StarWarsPersonInfoModal
                isOpen={true}
                label={selectedPerson.name}
                onClose={() => setSelectedPerson(null)}
                person={selectedPerson}
              />}
            </div>
            <Favorites className="card"/>
          </>
    }
  </main>
}

export default App;
