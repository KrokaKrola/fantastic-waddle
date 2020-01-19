import React from 'react';
import styled from 'styled-components';
import { logout } from '../../../helpers/utils';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import { useSpring, animated } from "react-spring";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  img {
    max-height: 50px;
    display: block;
    margin-right: 10px;
  }

  div > div {
    flex-basis: 50%;
    display: flex;
    flex-direction: column;
    margin-right: 10px;

    span {
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 16px;
      font-weight: 500;
    }
  }
`;

const UserBlock = styled(animated.div)`
    display: flex;
    align-items: center;
`

export default function HeaderUserInfo({ user, auth }) {
  const { photoURL, displayName, topScore } = user || auth;
  const fade = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    config: {
      duration: 250
    }
  });
  return (
    <Container>
      {user && (
        <UserBlock style={fade}>
          <img src={photoURL} alt="" />
          <div>
            <span>{displayName}</span>
            <span>Top score: {topScore}</span>
          </div>
          <Link to="/signin" onClick={logout} title="Logout">
            <Icon type="logout" style={{ fontSize: 32, color: '#8243b6' }} />
          </Link>
        </UserBlock>
      )}
    </Container>
  );
}
