import React from "react";
import { Button } from "react-bootstrap";
import { googleAuthProvider } from "../../firebase";
import { setErrors } from "../../utils";
import googleSvg from "../../assets/google.svg";
import { useAppState } from "../../app-state";

const GoogleAuthButton = ({ setLoading }) => {
  const [{ errors }, dispatch] = useAppState();

  const googleAuthHandler = async () => {
    setLoading(true);
    try {
      await googleAuthProvider();
    } catch (error) {
      setLoading(false);
      setErrors(errors, dispatch, error);
    }
  };

  return (
    <Button onClick={googleAuthHandler} variant="outline-light">
      <img style={{ width: 20 }} src={googleSvg} alt="" />
    </Button>
  );
};

export default GoogleAuthButton;
