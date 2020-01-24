import React from 'react';
import { useAppState } from '../../store/app-state';
import Category from './Category';
import CategoriesWrapper from '../utilsComponents/CategoriesWrapper';
import LinkText from '../utilsComponents/LinkText';
import { useTransition, animated } from 'react-spring';
import styled from 'styled-components';
import { useFade } from '../../hooks/useFade';

const FavouriteCategoryWrapper = styled(animated.div)`
  width: 20%;
  margin: 2.5%;

  & > div {
    width: 100%;
  }
`;

export default function FavouriteCategories({ handleTabChange }) {
  const [{ favourites }] = useAppState();
  const transitions = useTransition(
    favourites.sort((a, b) => b.addDate - a.addDate),
    item => item.id,
    {
      from: { opacity: 0, transform: `scale(1)` },
      enter: { opacity: 1 },
      leave: { opacity: 0, transform: `scale(0.8)` }
    }
  );
  return (
    <CategoriesWrapper>
      {transitions && !!transitions.length ? (
        transitions.map(({ item, props, key }) => (
          <FavouriteCategoryWrapper key={key} style={props}>
            <Category fav={true} category={item} />
          </FavouriteCategoryWrapper>
        ))
      ) : (
        <NoItems handleTabChange={handleTabChange} />
      )}
    </CategoriesWrapper>
  );
}

const NoItems = ({ handleTabChange }) => {
  const [fade] = useFade();
  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <animated.div style={fade}>
        <h4 style={{ flex: '1 0 100%', textAlign: 'center', fontSize: '2rem' }}>
          You dont have favourite categories yet
        </h4>
        <h5
          style={{ flex: '1 0 100%', textAlign: 'center', fontSize: '1.25rem' }}
        >
          you can add it on the{' '}
          <LinkText
            style={{ cursor: 'pointer' }}
            onClick={() => handleTabChange('1')}
          >
            All categories tab!
          </LinkText>
        </h5>
      </animated.div>
    </div>
  );
};
