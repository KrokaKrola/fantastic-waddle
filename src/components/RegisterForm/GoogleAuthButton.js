import React from "react";
import { Button } from "antd";
import { googleAuthProvider } from "../../firebase";
import { setErrors } from "../../utils";
import googleSvg from "../../assets/google.svg";

const GoogleAuthButton = ({ setLoading }) => {

  const googleAuthHandler = async () => {
    setLoading(true);
    try {
      await googleAuthProvider();
    } catch (error) {
      setLoading(false);
      setErrors(error);
    }
  };

  return (
    <Button onClick={googleAuthHandler} type="dashed">
      <img style={{ width: 20 }} src={googleSvg} alt="" />
    </Button>
  );
};

export default GoogleAuthButton;
