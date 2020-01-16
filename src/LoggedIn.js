import React, { useEffect } from 'react';
import { getDoc } from './utils';
import { useAppState } from './app-state';
import { Switch, Route, Redirect } from 'react-router-dom';

function LoggedIn() {
  const [{ auth, user }, dispatch] = useAppState();
  useEffect(() => {
    if (!user) {
      getDoc(`/users/${auth.uid}`).then(user => {
        dispatch({ type: 'LOAD_USER', user: user });
      });
    }
  }, [user, auth.uid, dispatch]);

  return user ? (
    <>
      <Switch>
        <Route path="/categories">categories</Route>
        <Redirect to="/categories" />
      </Switch>
    </>
  ) : null;
}

export default LoggedIn;
