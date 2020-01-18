import React from 'react';
import styled from 'styled-components';

const CategoriesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 200px;
  position: relative;
  padding: 40px;
`;

export default function({ children }) {
  return <CategoriesWrapper>{children}</CategoriesWrapper>;
}
