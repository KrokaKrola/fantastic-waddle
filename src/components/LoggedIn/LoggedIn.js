import React, { useEffect } from 'react';
import { getDoc } from '../../helpers/utils';
import { useAppState } from '../../store/app-state';
import { Switch, Route, Redirect } from 'react-router-dom';
import Categories from '../Categories';

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
    <div style={{ marginTop: 40 }}>
      <Switch>
        <Route path="/category" children={Categories}></Route>
        <Redirect to="/category"/>
      </Switch>
    </div>
  ) : null;
}

export default LoggedIn;
