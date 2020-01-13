import React, { useState } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { createUserWithEmailAndPassword, setErrors, loadingStyle } from "./../../utils";
import GoogleAuthButton from "./GoogleAuthButton";
import { useAppState } from "../../app-state";

const RegisterForm = () => {
  const [{ errors }, dispatch] = useAppState();
  const [loading, setLoading] = useState(false);

  const emailPaswordRegisterHandler = async event => {
    event.preventDefault();
    setLoading(true);
    const [displayName, email, password] = event.target.elements;
    const data = {
      displayName: displayName.value,
      email: email.value,
      password: password.value
    };
    try {
      await createUserWithEmailAndPassword(data);
    } catch (error) {
      setLoading(false);
      setErrors(errors, dispatch, error);
    }
  };

  return (
    <form
      style={loading ? loadingStyle : {}}
      onSubmit={emailPaswordRegisterHandler}
    >
      <div>
        <label htmlFor="name">Name</label>
        <InputGroup>
          <FormControl
            id="name"
            aria-label="User name"
            type="text"
            required={true}
          />
        </InputGroup>
      </div>
      <div>
        <label htmlFor="email_register">Email</label>
        <InputGroup>
          <FormControl
            id="email_register"
            aria-label="User email"
            type="email"
            required={true}
          />
        </InputGroup>
      </div>
      <div>
        <label htmlFor="password_register">Password</label>
        <InputGroup>
          <FormControl
            id="password_register"
            aria-label="User password"
            type="password"
            required={true}
          />
        </InputGroup>
      </div>
      <GoogleAuthButton setLoading={setLoading} />
      <Button type="submit" variant="primary">
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;