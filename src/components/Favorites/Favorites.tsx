import React, {FC}  from 'react';

interface FavoritesProps {
  className: string;
}

const Favorites: FC<FavoritesProps> = ({ className }) => {
  return (
    <div className={className}>
      <h1>Favorites</h1>

    </div>
  )
};

export default Favorites;
