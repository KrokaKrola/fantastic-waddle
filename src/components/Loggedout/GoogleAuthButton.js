import React from "react";
import { Button } from "antd";
import { googleAuthProvider } from "../../firebase";
import { setErrors } from "../../helpers/utils";
import googleSvg from "../../assets/google.svg";
import styled from 'styled-components';

const GoogleButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;

  span {
    margin: 0 20px 0 0;
    opacity: 0.7;
  }
`;

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
    <GoogleButtonContainer>
      <span>
        or login with
      </span>
      <Button size={'large'} onClick={googleAuthHandler} type="dashed">
        <img style={{ width: 20 }} src={googleSvg} alt="" />
      </Button>
    </GoogleButtonContainer>
  );
};

export default GoogleAuthButton;
