import React, { useState } from 'react';
import { useFormik } from 'formik';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import {
  createUserWithEmailAndPassword,
  setErrors,
  loadingStyle
} from './../../utils';
import GoogleAuthButton from './GoogleAuthButton';
import { useAppState } from '../../app-state';

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [{ errors }, dispatch] = useAppState();

  const emailPaswordRegisterHandler = async values => {
    setLoading(true);
    const { displayName, email, password } = values;
    const data = {
      displayName,
      email,
      password
    };
    try {
      await createUserWithEmailAndPassword(data);
    } catch (error) {
      setLoading(false);
      setErrors(errors, dispatch, error);
    }
  };

  const validate = values => {
    const errors = {};

    if (!values.displayName) {
      errors.displayName = 'Required';
    } else if (values.displayName.length > 15) {
      errors.displayName = 'Must be 15 characters or less';
    }

    if (!values.email) {
      errors.email = 'Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }

    if (!values.photoURL) {
      errors.photoURL = 'Required';
    } else if (
      !/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
        values.photoURL
      )
    ) {
      errors.photoURL = 'Invalid URL address';
    }

    if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.length < 6) {
      errors.password = 'Must be 6 characters or more';
    }

    if (values.repeatPassword !== values.password) {
      errors.repeatPassword = 'Password and repeat password must be equal';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      displayName: '',
      email: '',
      photoURL: 'https://placekitten.com/200/200',
      password: '',
      repeatPassword: ''
    },
    validate,
    onSubmit: values => {
      emailPaswordRegisterHandler(values);
    }
  });

  return (
    <form style={loading ? loadingStyle : {}} onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="displayName">Name</label>
        <InputGroup>
          <FormControl
            id="displayName"
            name="displayName"
            aria-label="User name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.displayName}
          />
        </InputGroup>
        {formik.touched.displayName && formik.errors.displayName ? (
          <span>{formik.errors.displayName}</span>
        ) : null}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <InputGroup>
          <FormControl
            id="email"
            name="email"
            aria-label="User email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
        </InputGroup>
        {formik.touched.email && formik.errors.email ? <span>{formik.errors.email}</span> : null}
      </div>
      <div>
        <label htmlFor="photoURL">Avatar URL</label>
        <InputGroup>
          <FormControl
            id="photoURL"
            name="photoURL"
            aria-label="Avatar URL"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.photoURL}
          />
        </InputGroup>
        {formik.touched.photoURL && formik.errors.photoURL ? <span>{formik.errors.photoURL}</span> : null}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <InputGroup>
          <FormControl
            id="password"
            name="password"
            aria-label="Password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
        </InputGroup>
        {formik.touched.password && formik.errors.password ? <span>{formik.errors.password}</span> : null}
      </div>
      <div>
        <label htmlFor="password">Repeat Password</label>
        <InputGroup>
          <FormControl
            id="repeatPassword"
            name="repeatPassword"
            aria-label="Repeat Password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.repeatPassword}
          />
        </InputGroup>
        {formik.touched.repeatPassword && formik.errors.repeatPassword && (
          <span>{formik.errors.repeatPassword}</span>
        )}
      </div>
      <GoogleAuthButton setLoading={setLoading} />
      <Button type="submit" variant="primary">
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;