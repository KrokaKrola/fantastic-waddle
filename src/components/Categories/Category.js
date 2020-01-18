import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { rainbowStop } from '../../helpers/utils';
import Tilt from 'react-tilt';
import AddToFavourite from './AddToFavourite';
import { useAppState } from '../../store/app-state';

const CategoryLink = styled(Link)`
  width: 100%;
  height: 200px;
  display: block;
  color: #fff;
  font-size: 24px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  text-shadow: 0px 0px 7px black;
  padding: 0 10px;
  background-color: ${props => rainbowStop(props.id)};
  transition: 0.2s ease;

  &:hover {
    color: #fff;
    text-shadow: 0px 0px 25px black;
  }
`;

const Category = ({ category, fav }) => {
  const [{user}, dispatch] = useAppState();
  const { id, name } = category;

  const handleClick = id => {
    dispatch({ type: 'CHANGE_GAME_STATE', game: { choosedCategory: id } });
  };
  return (
    <Tilt
      className="Tilt"
      style={{ width: '20%', margin: '2.5%', position: 'relative' }}
      options={{ max: 25, scale: 1.1 }}
    >
      <AddToFavourite fav={fav} id={id} uid={user.uid} name={name} />
      <CategoryLink
        to="/difficulty"
        id={id}
        children={name}
        onClick={() => handleClick(id)}
      />
    </Tilt>
  );
};

export default memo(Category);
