import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { Button } from 'react-bootstrap';
import {
  createUserWithEmailAndPassword,
  setErrors,
  loadingStyle,
  objectLen
} from './../../utils';
import GoogleAuthButton from './GoogleAuthButton';
import { useAppState } from '../../app-state';
import * as Yup from 'yup';
import Field from '../utilsComponents/Field';

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

  return (
    <Formik
      initialValues={{
        displayName: '',
        email: '',
        photoURL: 'https://placekitten.com/200/200',
        password: '',
        repeatPassword: ''
      }}
      validationSchema={Yup.object({
        displayName: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .min(2, 'Must be at least 2 characters')
          .required('This field is required'),
        email: Yup.string()
          .email('Invalid email address')
          .required('This field is required'),
        photoURL: Yup.string()
          .url('Invalid URL address')
          .required('This field is required'),
        password: Yup.string()
          .min(6, 'Must be at least 6 characters')
          .required('This field is required'),
        repeatPassword: Yup.string().oneOf(
          [Yup.ref('password'), null],
          "Passwords don't match"
        )
      })}
      onSubmit={(values, { setSubmitting }) => {
        // emailPaswordRegisterHandler(values);
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {formik => (
        <Form style={loading ? loadingStyle : {}}>
          <Field
            label="Name"
            name="displayName"
            type="text"
            placeholder="User name"
          />
          <Field
            label="Email"
            name="email"
            type="email"
            placeholder="User email"
          />
          <Field
            label="Avatar URL"
            name="photoURL"
            type="text"
            placeholder="Avatar URL"
          />
          <Field
            label="Password"
            name="password"
            type="password"
            placeholder="Password"
          />
          <Field
            label="Repeat Password"
            name="repeatPassword"
            type="password"
            placeholder="Repeat Password"
          />

          <GoogleAuthButton setLoading={setLoading} />
          <Button
            disabled={
              objectLen(formik.errors)
                ? true
                : formik.isSubmitting
                ? true
                : false
            }
            type="submit"
            variant="primary"
          >
            Register
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
