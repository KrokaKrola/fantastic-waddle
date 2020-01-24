import React from 'react';
import styled from 'styled-components';

const CategoriesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 200px;
  position: relative;
  padding: 40px;
  overflow-y: scroll;
  max-height: 60vh;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export default function({ children }) {
  return <CategoriesWrapper>{children}</CategoriesWrapper>;
}
