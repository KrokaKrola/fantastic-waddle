import React from 'react';
import { initialState, appStateReducer } from './store/appReducer';
import AppStateProvider from './store/app-state';
import useAuth from './hooks/useAuth';
import LoggedOut from './components/Loggedout/LoggedOut';
import LoggedIn from './components/LoggedIn/LoggedIn';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
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
