import React from 'react';
import styled from 'styled-components';
import mainLogo from '../../../assets/mainLogo.png';
import LinkText from '../../utilsComponents/LinkText';
import { Link, useLocation } from 'react-router-dom';
import { useAppState } from '../../../store/app-state';
import HeaderUserInfo from './HeaderUserInfo';
import Container from '../../utilsComponents/Container';

const StyledHeader = styled.header`
  background-color: #fff;
  height: 65px;
  box-shadow: 0 1px 9px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
`;

const HeaderContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledLink = styled(Link)`
  max-width: 120px;
  img {
    display: block;
    width: 100%;
  }
`;

export default function Header() {
  const { pathname } = useLocation();
  const [{ auth, user }] = useAppState();
  return (
    <StyledHeader>
      <HeaderContainer>
        <StyledLink to="/">
          <img src={mainLogo} alt="Logo" title="Trivia game" />
        </StyledLink>
        {auth ? (
          <HeaderUserInfo auth={auth} user={user} />
        ) : (
          <Link to={pathname === '/signup' ? '/signin' : '/signup'}>
            <LinkText>
              {pathname === '/signup' ? 'Sign in' : 'Sign up'}
            </LinkText>
          </Link>
        )}
      </HeaderContainer>
    </StyledHeader>
  );
}
