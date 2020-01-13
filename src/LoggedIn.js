import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { logout, getDoc } from "./utils";
import { useAppState } from "./app-state";

function LoggedIn() {
  const [{ auth, user }, dispatch] = useAppState();

  useEffect(() => {
    if (!user) {
      getDoc(`/users/${auth.uid}`).then(user => {
        dispatch({ type: "LOAD_USER", user: user });
      });
    }
  }, [user, auth.uid, dispatch]);

  return user ? (
    <>
      main section of logged {user.displayName}{" "}
      <Button onClick={logout}>logout</Button>
    </>
  ) : null;
}

export default LoggedIn;
