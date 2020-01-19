import React, { useState } from 'react';
import { Spin } from 'antd';
import { Switch, Route, Redirect } from 'react-router-dom';
import SignIn from './Login';
import SignUp from './Register';

const LoggedOut = () => {
  const [submiting, setSubmiting] = useState(false);
  return (
    <div style={{ display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%'}}>
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
    </div>
  );
};

export default LoggedOut;
