import { useEffect } from "react";
import { useAppState } from "./app-state";
import { onAuthStateChanged } from "./utils";

export default function useAuth() {
  const [{ auth, authAttempted }, dispatch] = useAppState();

  useEffect(() => {
    return onAuthStateChanged(auth => {
      if (auth) {
        const { displayName, email, uid, photoURL } = auth;
        dispatch({
          type: "CHANGE_AUTH_STATE",
          authState: {
            auth: { displayName, email, uid, photoURL }
          }
        });
      } else {
        dispatch({
          type: "CHANGE_AUTH_STATE",
          authState: {
            auth: null,
            user: null
          }
        });
      }
    });
  }, [dispatch]);

  return { auth, authAttempted };
}
