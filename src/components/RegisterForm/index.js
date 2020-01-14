import React from 'react';
import { Formik } from 'formik';
import { Button, Form, Icon } from 'antd';
import * as Yup from 'yup';
import GoogleAuthButton from './GoogleAuthButton';
import Field from '../utilsComponents/Field';
import {
  createUserWithEmailAndPassword,
  setErrors,
  objectLen
} from './../../utils';
import {
  maxError,
  minError,
  required,
  emailError,
  urlError,
  passwordMatchError
} from '../../errorMessages';

const RegisterForm = ({ setSubmiting }) => {
  const emailPaswordRegisterHandler = async values => {
    setSubmiting(true);
    const { displayName, email, password } = values;
    const data = {
      displayName,
      email,
      password
    };
    try {
      await createUserWithEmailAndPassword(data);
      sessionStorage.clear();
    } catch (error) {
      setSubmiting(false);
      setErrors(error);
    }
  };

  return (
    <Formik
      initialValues={{
        displayName: sessionStorage.getItem('displayName'),
        email: sessionStorage.getItem('email'),
        photoURL:
          sessionStorage.getItem('photoURL') ||
          'https://placekitten.com/200/200',
        password: sessionStorage.getItem('password'),
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
        <Form onSubmit={formik.handleSubmit} layout={'horizontal'}>
          <Field
            label="Name"
            name="displayName"
            id="displayName"
            type="text"
            placeholder="User name"
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          />
          <Field
            label="Email"
            name="email"
            id="email"
            type="email"
            placeholder="User email"
            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
          />
          <Field
            label="Avatar URL"
            name="photoURL"
            id="photoURL"
            type="text"
            placeholder="Avatar URL"
            prefix={<Icon type="link" style={{ color: 'rgba(0,0,0,.25)' }} />}
          />
          <Field
            label="Password"
            name="password"
            id="password"
            type="password"
            placeholder="Password"
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          />
          <Field
            label="Repeat Password"
            name="repeatPassword"
            id="repeatPassword"
            type="password"
            placeholder="Repeat Password"
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          />
          <div>
            <GoogleAuthButton setLoading={setSubmiting} />
            <Button
              disabled={objectLen(formik.errors) ? true : false}
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
