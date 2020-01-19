import React from 'react';
import { Icon } from 'antd';
import styled from 'styled-components';
import { setDoc, removeDoc, setErrors } from '../../helpers/utils';

const FavouriteButton = styled(Icon)`
  font-size: 24px;
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  color: yellow;
`;

export default function AddToFavourite({ id, fav, uid, name }) {
  const clickHandler = (id, uid, name, fav) => {
    const path = `/users/${uid}/favourites/${id}`;
    try {
      if(fav) {
        removeDoc(path);
      } else {
        setDoc(path, { id, name, addDate: new Date().getTime() });
      }
    } catch(error) {
      setErrors(error.message)
    }
  };

  return (
    <FavouriteButton
      type="star"
      theme={fav ? 'filled' : 'twoTone'}
      title="Add to favourites"
      onClick={() => clickHandler(id, uid, name, fav)}
    />
  );
}
