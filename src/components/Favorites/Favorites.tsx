import React, {
  FC,
  useState
}                              from 'react';
import 'components/App/index.css'
import StarWarsPersonInfoModal from "../StarWarsPersonInfoModal/StarWarsPersonInfoModal";
import {DragDropContext}       from "react-beautiful-dnd";
import {StarWarsPerson}        from "../../sdk/hooks/starWarsPeople/useStarWarsPeopleSdk";

interface FavoritesProps {
  className: string;
  isDragging: boolean;
  innerRef: (element: HTMLElement | null) => any;
  favorites: string[];
}

const Favorites: FC<FavoritesProps> = ({
                                         className,
                                         innerRef,
                                         isDragging,
                                         favorites
                                       }) => {
  const [selected, setSelected] = useState<string | null>(null);

  const getPersonInfoByName = (name: string): StarWarsPerson => {
    const allPeople = Object.keys(
      Object.assign({}, localStorage)
    )
      .filter((key) => /person/.test(key))
      .map((key) => JSON.parse(localStorage.getItem(key) ?? '{}'))

    return allPeople.find((person: StarWarsPerson) => person.name === name);
  }

  return (
    <div className={className} ref={innerRef}>
      <h1>Favorites</h1>
      {isDragging && <h3>Drop here to make person favorite</h3>}
      {favorites.map((fav) =>
        <div className="person-card" key={fav} onClick={() => setSelected(fav)}>
          {fav}
        </div>
      )}
      {selected && <StarWarsPersonInfoModal
        isOpen={true}
        label={selected}
        onClose={() => setSelected(null)}
        person={getPersonInfoByName(selected)}
      />}
    </div>
  )
};

export default Favorites;
