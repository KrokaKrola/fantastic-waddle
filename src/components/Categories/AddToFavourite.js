import React from 'react';
import { Icon } from 'antd';
import styled from 'styled-components';
import { setDoc, removeDoc } from '../../helpers/utils';

const FavouriteButton = styled(Icon)`
  font-size: 24px;
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  color: yellow;
`;

export default function AddToFavourite({ id, fav, uid, name }) {
  const clickHandler = id => {
    if(fav) {
      removeDoc(`/users/${uid}/favourites/${id}`);
    } else {
      setDoc(`/users/${uid}/favourites/${id}`, { id, name });
    }
  };

  return (
    <FavouriteButton
      type="star"
      theme={fav ? 'filled' : 'twoTone'}
      title="Add to favourites"
      onClick={() => clickHandler(id)}
    />
  );
}
