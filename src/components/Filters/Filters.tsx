import React, {
  FC,
  FormEventHandler,
  ReactEventHandler
} from 'react';
import {Filter} from "components/App/App";
import {useSpeciesList} from "hooks/useSpeciesList";
import {useMoviesList} from "hooks/useMoviesList";
import 'components/Filters/index.css'

interface FiltersProps {
  className: string;
  onFiltersChange: (newFilter: Filter) => void;
  filter: Filter;
}

const Filters: FC<FiltersProps> = ({
                                     className,
                                     onFiltersChange,
                                     filter
                                   }) => {
  const species = useSpeciesList();
  const movies  = useMoviesList();

  const handleSelectDate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const getDateFromForm = (formData: FormData, name: string) => {
      const data = formData.get(name)

      return data ? +data : undefined;
    }

    onFiltersChange({
      ...filter,
      date: {
        startDate: getDateFromForm(data, 'date-from'),
        endDate: getDateFromForm(data, 'date-to')
      }
    })
  }

  const handleSelectSpecieOrMovie = (name: 'movies' | 'species', value: string, selected: boolean) => {
    if (selected) {
      return onFiltersChange({
        ...filter,
        [name]: [...filter[name], value]
      })
    }

    onFiltersChange({
      ...filter,
      [name]: filter[name].filter((data) => data !== value)
    })
  }

  return (
    <div className={className}>
      <h1>Filters</h1>
      <div>
        <h3>Movies:</h3>
        <ul>
          {movies.map((movie) => (
            <div key={movie.episode_id} className="checkbox">
              <li>{`Episode ${movie.episode_id}`}</li>
              <input type="checkbox"
                     onChange={(e) => handleSelectSpecieOrMovie('movies', movie.url, e.target.checked)}/>
            </div>
          ))}
        </ul>
      </div>
      <div>
        <h3>Species:</h3>
        <ul>
          {species.map((specie) => (
            <div key={specie.name} className="checkbox">
              <li>{specie.name}</li>
              <input type="checkbox"
                     onChange={(e) => handleSelectSpecieOrMovie('species', specie.url, e.target.checked)}/>
            </div>
          ))}
        </ul>
      </div>
      <div>
        <h3>Date range: </h3>
        <form onSubmit={handleSelectDate}>
          <div>
            <label htmlFor="date-from">Date from(BBY):</label>
            <input name="date-from" type="number" />
          </div>
          <div>
            <label htmlFor="date-from">Date to(ABY):</label>
            <input name="date-to" type="number" />
          </div>
          <button type="submit">Submit Date</button>
        </form>
      </div>
    </div>
  )
};

export default Filters;
