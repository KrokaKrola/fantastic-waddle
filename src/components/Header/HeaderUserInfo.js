import React from 'react';
import styled from 'styled-components';
import { logout } from '../../utils';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  img {
    max-height: 50px;
    display: block;
    margin-right: 10px;
  }

  div {
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

export default function HeaderUserInfo({ user }) {
  const { photoURL, displayName, topScore } = user;
  return (
    <Container>
      <img src={photoURL} alt="" />
      <div>
        <span>{displayName}</span>
        <span>Top score: {topScore}</span>
      </div>
      <Link to="/signin" onClick={logout} title="Logout">
        <Icon type="logout" style={{ fontSize: 32, color: '#8243b6' }} />
      </Link>
    </Container>
  );
}
