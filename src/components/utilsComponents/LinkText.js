import React from 'react';
import styled from 'styled-components';

const LinkText = styled.span`
  color: #8243b6;
  border-bottom: 1px solid #8243b6;
  transition: 0.2s ease;
  font-size: 18px;
  font-weight: bold;
  &:hover {
    border-bottom-color: transparent;
  }
`;

export default function ({ children, ...props }) {
  return <LinkText {...props}>{children}</LinkText>;
}
