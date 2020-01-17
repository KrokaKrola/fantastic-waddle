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
