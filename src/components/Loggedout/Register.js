import React from 'react';
import { Formik } from 'formik';
import { Button, Form } from 'antd';
import * as Yup from 'yup';
import GoogleAuthButton from './GoogleAuthButton';
import Field, { FieldIcon } from '../utilsComponents/Field';
import {
  createUserWithEmailAndPassword,
  setErrors,
  objectLen
} from '../../utils';
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
        displayName: sessionStorage.getItem('displayName') || '',
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
        <Form onSubmit={formik.handleSubmit} layout="horizontal">
          <Field
            label="Name"
            name="displayName"
            id="displayName"
            type="text"
            placeholder="User name"
            prefix={<FieldIcon type="user" />}
          />
          <Field
            label="Email"
            name="email"
            id="email"
            type="email"
            placeholder="User email"
            prefix={<FieldIcon type="mail" />}
          />
          <Field
            label="Avatar URL"
            name="photoURL"
            id="photoURL"
            type="text"
            placeholder="Avatar URL"
            prefix={<FieldIcon type="link" />}
          />
          <Field
            label="Password"
            name="password"
            id="password"
            type="password"
            placeholder="Password"
            prefix={<FieldIcon type="lock" />}
          />
          <Field
            label="Repeat Password"
            name="repeatPassword"
            id="repeatPassword"
            type="password"
            placeholder="Repeat Password"
            prefix={<FieldIcon type="lock" />}
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Button
              disabled={objectLen(formik.errors) ? true : false}
              htmlType="submit"
              type="primary"
              size={'large'}
              style={{
                padding: '0 40px'
              }}
            >
              Register
            </Button>
            <span style={{ margin: '0 20px', opacity: 0.7 }}>
              or login with
            </span>
            <GoogleAuthButton setLoading={setSubmiting} />
          </div>
        </Form>
      )}
    </Formik>
  );
};



export default RegisterForm;
