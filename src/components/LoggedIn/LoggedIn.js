import React, { useEffect } from 'react';
import { getDoc, subscribeToCollection } from '../../helpers/utils';
import { useAppState } from '../../store/app-state';
import { Switch, Route, Redirect } from 'react-router-dom';
import Categories from '../Categories';
import Difficulty from '../Difficulty';
import Game from '../Game';
import User from '../User';

function LoggedIn() {
  const [{ auth, user, game }, dispatch] = useAppState();
  useEffect(() => {
    if (!user) {
      let cleanup = () => false;
      function collectionCallback(collection) {
        const docs = [];
        collection.forEach(doc => {
          docs.push(doc.data());
        });
        dispatch({ type: 'CHANGE_FAVOURITES_STATE', favourites: docs });
      }
      getDoc(`/users/${auth.uid}`).then(user => {
        cleanup = subscribeToCollection(
          `/users/${auth.uid}/favourites`,
          collectionCallback
        );
        dispatch({ type: 'LOAD_USER', user: user });
      });
      return cleanup;
    }
  }, [user, auth.uid, dispatch]);

  return user ? (
    <div style={{ marginTop: 40 }}>
      <Switch>
        <Route path="/user/:uid">
          <User />
        </Route>
        <Route path="/category">
          <Categories />
        </Route>
        <Route path="/difficulty">
          <Difficulty />
        </Route>
        <Route path="/game">
          {!!game.choosedCategory ? (
            !!game.choosedDifficulty ? (
              <Game />
            ) : (
              <Redirect to="/difficulty" />
            )
          ) : (
            <Redirect to="/category" />
          )}
        </Route>
        <Redirect to="/category" />
      </Switch>
    </div>
  ) : null;
}

export default LoggedIn;
