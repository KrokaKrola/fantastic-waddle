import React, { useEffect } from 'react';
import { getDoc } from '../../helpers/utils';
import { useAppState } from '../../store/app-state';
import { Switch, Route, Redirect } from 'react-router-dom';
import Categories from '../Categories';
import { db } from '../../firebase';

function LoggedIn() {
  const [{ auth, user, game }, dispatch] = useAppState();
  useEffect(() => {
    if (!user) {
      getDoc(`/users/${auth.uid}`).then(user => {
        db.collection(`/users/${auth.uid}/favourites`).onSnapshot(function(
          collection
        ) {
          const docs = [];
          collection.forEach(doc => {
            docs.push(doc.data());
          });
          dispatch({ type: 'CHANGE_FAVOURITES_STATE', favourites: docs });
        });
        dispatch({ type: 'LOAD_USER', user: user });
      });
    }
  }, [user, auth.uid, dispatch]);

  return user ? (
    <div style={{ marginTop: 40 }}>
      <Switch>
        <Route path="/category">
          <Categories />
        </Route>
        <Route
          path="/difficulty"
          children={JSON.stringify(game, null, 2)}
        ></Route>
        <Redirect to="/category" />
      </Switch>
    </div>
  ) : null;
}

export default LoggedIn;
