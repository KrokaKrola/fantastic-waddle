import React from 'react'
import styled from 'styled-components';

const StyledContainer = styled.div`
  max-width: 1180px;
  padding: 0 20px;
  margin: 0 auto;
  width: 100%;
`;

export default function Container({children, ...rest}) {
  return (
    <StyledContainer {...rest}>
      {children}
    </StyledContainer>
  )
}

