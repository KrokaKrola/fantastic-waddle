import React, { useState } from 'react';
import { Spin } from 'antd';
import { Switch, Route, Redirect } from 'react-router-dom';
import SignIn from './Login';
import SignUp from './Register';
import styled from 'styled-components';

const FlexCenter = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const LoggedOut = () => {
  const [submiting, setSubmiting] = useState(false);
  return (
    <FlexCenter>
      <Spin spinning={submiting}>
        <Switch>
          <Route path="/signin">
            <SignIn setSubmiting={setSubmiting} />
          </Route>
          <Route path="/signup">
            <SignUp setSubmiting={setSubmiting} />
          </Route>
          <Redirect from="/" to="/signup" />
        </Switch>
      </Spin>
    </FlexCenter>
  );
};

export default LoggedOut;
