import React, { useState } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { signInWithEmailAndPassword, setErrors, loadingStyle } from "./../../utils";
import { useAppState } from "../../app-state";

const LoginForm = () => {
  const [{ errors }, dispatch] = useAppState();
  const [loading, setLoading] = useState(false);

  async function emailPaswordLoginHandler(event) {
    event.preventDefault();
    setLoading(true);
    const [email, password] = event.target.elements;
    try {
      await signInWithEmailAndPassword({
        email: email.value,
        password: password.value
      });
    } catch (error) {
      setLoading(false);
      setErrors(errors, dispatch, error);
    }
  }

  return (
    <form
      style={loading ? loadingStyle : {}}
      onSubmit={emailPaswordLoginHandler}
    >
      <div>
        <label htmlFor="email_login">Email</label>
        <InputGroup>
          <FormControl
            required={true}
            id="email_login"
            aria-label="User email"
            type="email"
          />
        </InputGroup>
      </div>
      <div>
        <label htmlFor="password_login">Password</label>
        <InputGroup>
          <FormControl
            required={true}
            id="password_login"
            aria-label="User password"
            type="password"
          />
        </InputGroup>
      </div>
      <Button type="submit" variant="primary">
        Login
      </Button>
    </form>
  );
}

export default LoginForm;