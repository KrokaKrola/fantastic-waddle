import React from 'react';
import useCategories from '../../hooks/useCategories';
import Category from './Category';
import CategoriesWrapper from '../utilsComponents/CategoriesWrapper';
import SpinnerContainer from '../utilsComponents/SpinnerContainer';
import { useAppState } from '../../store/app-state';

export default function AllCategories() {
  const [loading, categories] = useCategories();
  const [{ favourites }] = useAppState();

  function isFav(id) {
    return favourites &&
      favourites.findIndex(item => {
        return parseInt(item.id) === id;
      }) !== -1
      ? true
      : false;
  }

  return (
    <CategoriesWrapper>
      <SpinnerContainer loading={loading} />
      {!loading && (
        <Category
          fav={isFav(1)}
          key={1}
          category={{ id: 1, name: 'Any category' }}
        />
      )}
      {categories &&
        categories.map(category => (
          <Category
            fav={isFav(category.id)}
            key={category.id}
            category={category}
          />
        ))}
    </CategoriesWrapper>
  );
}
