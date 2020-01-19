import React, { useState } from 'react';
import { Spin } from 'antd';
import { Switch, Route, Redirect } from 'react-router-dom';
import SignIn from './Login';
import SignUp from './Register';
import styled from 'styled-components';

const LoggedOutContainer = styled.div`
    background: white;
    max-width: 560px;
    margin: auto;
    padding: 40px;
    width: 100%;
    border: 1px solid #fafafa;
    box-shadow: 0 0 25px rgba(0,0,0,0.05);
    transition: .2s ease;
    &:hover {
      box-shadow: 0 0 35px rgba(0,0,0, 0.07);
    }
`;

const LoggedOut = () => {
  const [submiting, setSubmiting] = useState(false);
  return (
    <LoggedOutContainer>
      <Spin spinning={submiting}>
          <Switch>
            <Route path="/signin">
              <SignIn setSubmiting={setSubmiting} />
            </Route>
            <Route path="/signup">
              <SignUp setSubmiting={setSubmiting} />
            </Route>
            <Redirect from='/' to='/signup' />
          </Switch>
      </Spin>
    </LoggedOutContainer>
  );
};

export default LoggedOut;
