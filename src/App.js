import React from "react";
import { initialState, appStateReducer } from "./appReducer";
import AppStateProvider from "./app-state";
import useAuth from "./useAuth";
import LoggedOut from "./LoggedOut";
import LoggedIn from "./LoggedIn";
import ToastComponent from "./ToastComponent";

function App() {
  const { auth, authAttempted } = useAuth();
  if (!authAttempted) return null;
  return (
    <div>
      {auth ? <LoggedIn /> : <LoggedOut />}
      <ToastComponent />
    </div>
  );
}

export default () => {
  return (
    <AppStateProvider reducer={appStateReducer} initialState={initialState}>
      <App />
    </AppStateProvider>
  );
};
