import React, { useState } from 'react';
import { Formik } from 'formik';
import { Button, Form } from 'antd';
import {
  createUserWithEmailAndPassword,
  setErrors,
  loadingStyle,
  objectLen
} from './../../utils';
import GoogleAuthButton from './GoogleAuthButton';
import * as Yup from 'yup';
import Field from '../utilsComponents/Field';
import {
  maxError,
  minError,
  required,
  emailError,
  urlError,
  passwordMatchError
} from '../../errorMessages';

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);

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
      setErrors(error);
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
          .max(15, maxError(15))
          .min(2, minError(2))
          .required(required),
        email: Yup.string()
          .email(emailError)
          .required(required),
        photoURL: Yup.string()
          .url(urlError)
          .required(required),
        password: Yup.string()
          .min(6, minError(6))
          .required(required),
        repeatPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], passwordMatchError)
          .required(required)
      })}
      onSubmit={(values, { setSubmitting }) => {
        emailPaswordRegisterHandler(values);
        setSubmitting(false);
      }}
    >
      {formik => (
        <Form
          onSubmit={formik.handleSubmit}
          style={loading ? loadingStyle : {}}
        >
          <Field
            label="Name"
            name="displayName"
            id="displayName"
            type="text"
            placeholder="User name"
          />
          <Field
            label="Email"
            name="email"
            id="email"
            type="email"
            placeholder="User email"
          />
          <Field
            label="Avatar URL"
            name="photoURL"
            id="photoURL"
            type="text"
            placeholder="Avatar URL"
          />
          <Field
            label="Password"
            name="password"
            id="password"
            type="password"
            placeholder="Password"
          />
          <Field
            label="Repeat Password"
            name="repeatPassword"
            id="repeatPassword"
            type="password"
            placeholder="Repeat Password"
          />
          <div style={{ marginTop: 40 }}>
            <GoogleAuthButton setLoading={setLoading} />
            <Button
              disabled={
                formik.isSubmitting
                  ? true
                  : objectLen(formik.errors)
                  ? true
                  : false
              }
              htmlType="submit"
              type="primary"
            >
              Register
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
