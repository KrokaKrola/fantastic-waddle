import React from 'react';
import { initialState, appStateReducer } from './appReducer';
import AppStateProvider from './app-state';
import useAuth from './useAuth';
import LoggedOut from './LoggedOut';
import LoggedIn from './LoggedIn';
import Header from './Header';
import Footer from './Footer';
import styled from 'styled-components';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

function App() {
  const { auth, authAttempted } = useAuth();
  if (!authAttempted) return null;
  return (
    <BrowserRouter>
      <AppContainer>
        <Header />
        <Switch>
          <Route path="/about">
            about
          </Route>
          <Route path="/">
            {auth ? <LoggedIn /> : <LoggedOut />}
          </Route>
        </Switch>
        <Footer />
      </AppContainer>
    </BrowserRouter>
  );
}

export default () => {
  return (
    <AppStateProvider reducer={appStateReducer} initialState={initialState}>
      <App />
    </AppStateProvider>
  );
};
