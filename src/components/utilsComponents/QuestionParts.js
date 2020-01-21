import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';

const StyledHeader = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin: 40px 0;
`;

const StyledButton = styled(Button)`
  display: block;
  width: 100%;
  height: 55px;
  font-size: 24px;
  font-weight: bold;
`;

export function Name({ children, ...rest }) {
  return <StyledHeader {...rest}>{children}</StyledHeader>;
}

export function NextQuestionButton({ children, ...rest }) {
  return <StyledButton  type = 'primary' {...rest}>{children}</StyledButton>;
}
