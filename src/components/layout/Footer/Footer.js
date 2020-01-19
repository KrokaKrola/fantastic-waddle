import React from 'react';
import styled from 'styled-components';
import LinkText from '../../utilsComponents/LinkText';
import { Link } from 'react-router-dom';

const FooterDiv = styled.div`
  margin-top: auto;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;

  a {
    margin-left: 6px;
  }
`;

export default function Footer() {
  return (
    <FooterDiv>
      Created by{' '}
      <Link to="/about">
        <LinkText>Oleg Kotlinskii</LinkText>
      </Link>
    </FooterDiv>
  );
}
