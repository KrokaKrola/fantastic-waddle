import React from 'react';
import styled from 'styled-components';
import mainLogo from './assets/mainLogo.png';
import LinkText from './components/utilsComponents/LinkText';
import { Link, useLocation } from 'react-router-dom';
import { useAppState } from './app-state';
import HeaderUserInfo from './components/Header/HeaderUserInfo'

const StyledHeader = styled.header`
  background-color: #fff;
  height: 65px;
  box-shadow: 0 1px 9px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  max-width: 1180px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  width: 100%;
`;

const Logo = styled.a`
  max-width: 120px;
  img {
    display: block;
    width: 100%;
  }
`;

export default function Header() {
  const { pathname } = useLocation();
  const [{ auth }] = useAppState();
  return (
    <StyledHeader>
      <Container>
        <Logo href="/">
          <img src={mainLogo} alt="Logo" title="Trivia game" />
        </Logo>
        {auth ? (
          <HeaderUserInfo user={auth} />
        ) : (
          <Link to={pathname === '/signup' ? '/signin' : '/signup'}>
            <LinkText>
              {pathname === '/signup' ? 'Sign in' : 'Sign up'}
            </LinkText>
          </Link>
        )}
      </Container>
    </StyledHeader>
  );
}
