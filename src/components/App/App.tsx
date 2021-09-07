import 'components/App/index.css'
import {useStarWarsPeopleWithInfo} from "hooks/useStarWarsPeopleWithInfo";
import {RequestStatus}             from "sdk/hooks/useStarWarsSdk";
import React, {
  useEffect,
  useState
}                                  from "react";
import {StarWarsPerson}            from "sdk/hooks/starWarsPeople/useStarWarsPeopleSdk";
import StarWarsPersonInfoModal     from "components/StarWarsPersonInfoModal/StarWarsPersonInfoModal";
import Filters                     from "components/Filters/Filters";
import Favorites                   from "components/Favorites/Favorites";
import {
  DragDropContext,
  Draggable,
  DragStart,
  Droppable,
  DropReason,
  DropResult,
  ResponderProvided
}                                  from 'react-beautiful-dnd';
import {getIdFromPersonUrl}        from "../../utils";

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
    movies:  [],
    species: [],
    date:    {}
  });
  const [selectedPerson, setSelectedPerson] = useState<StarWarsPerson | null>(null);
  const [filtredPeople, setFiltredPeople]   = useState<StarWarsPerson[] | null>(result);
  const [isDragging, setIsDragging]         = useState<boolean>(false);
  const [favorites, setFavorites]           = useState<string[]>(JSON.parse(localStorage.getItem('favorites') || '[]'))

  const filterPeople = (people: StarWarsPerson[] | null) => {
    if (!people) return [];

    const {
            movies,
            species,
            date
          }    = currentFilter;
    let result = [...people];

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
      result          = result.filter((person) => {
        const slicedBirthYear = person.birth_year.slice(0, 3);
        if (isNaN(+slicedBirthYear)) return false;
        return +slicedBirthYear > startDate
      })
    }

    if (date.endDate) {
      const endDate = date.endDate;
      result        = result.filter((person) => {
        const slicedBirthYear = person.birth_year.slice(0, 3);
        if (isNaN(+slicedBirthYear)) return false;
        return +slicedBirthYear < endDate
      })
    }

    return result;
  };

  const onFilterChange = (newFilter: Filter) => {
    setCurrentFilter(newFilter)
  }

  useEffect(() => setFiltredPeople(filterPeople(result)), [currentFilter])
  useEffect(() => refetch(), [])
  useEffect(() => setFiltredPeople(result), [result])

  const handleDragStart = () => {
    setIsDragging(true);
  }
  const handleDragEnd   = (result: DropResult) => {
    setIsDragging(false);
    setFavorites((prev) => {
      const newFavorites = prev.some((prev) => prev === result.draggableId) ? prev : [...prev, result.draggableId];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  }

  return <main className="main">
    {
      status === RequestStatus.Loading ?
        <h1>Loading Star Wars People List...</h1> :
        error ? <h1 color="red">{error}</h1> :
          <>
            <Filters className="card" onFiltersChange={onFilterChange} filter={currentFilter}/>
            <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
              <Droppable droppableId="people" isDropDisabled>
                {provided =>
                  <div className="card" ref={provided.innerRef} {...provided.droppableProps}>
                    <h1>Star Wars People List</h1>
                    {filtredPeople?.map((person, index) => (
                      <Draggable key={person.name} index={index} draggableId={person.name}>
                        {(provided) => (
                          <div ref={provided.innerRef}
                               className="person-card"
                               {...provided.draggableProps}
                               {...provided.dragHandleProps}
                               onClick={() => setSelectedPerson(person)}
                          >
                            {person.name}
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                }
              </Droppable>
              {selectedPerson && <StarWarsPersonInfoModal
                isOpen={true}
                label={selectedPerson.name}
                onClose={() => setSelectedPerson(null)}
                person={selectedPerson}
              />}
              <Droppable droppableId="favorites">
                {(provided) => (
                  <Favorites
                    favorites={favorites}
                    innerRef={provided.innerRef}
                    {...provided.droppableProps}
                    className="card"
                    isDragging={isDragging}
                  />
                )}
              </Droppable>
            </DragDropContext>
          </>
    }
  </main>
}

export default App;
