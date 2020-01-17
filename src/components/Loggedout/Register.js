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
} from '../../helpers/utils';
import {
  maxError,
  minError,
  required,
  emailError,
  urlError,
  passwordMatchError
} from '../../helpers/errorMessages';

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
        email: sessionStorage.getItem('email') || '',
        photoURL:
          sessionStorage.getItem('photoURL') ||
          'https://placekitten.com/200/200',
        password: sessionStorage.getItem('password') || '',
        repeatPassword: ''
      }}
      validationSchema={Yup.object({
        displayName: Yup.string()
          .nullable()
          .max(15, maxError(15))
          .min(2, minError(2))
          .required(required),
        email: Yup.string()
          .nullable()
          .email(emailError)
          .required(required),
        photoURL: Yup.string()
          .nullable()
          .url(urlError),
        password: Yup.string()
          .nullable()
          .min(6, minError(6))
          .required(required),
        repeatPassword: Yup.string()
          .nullable()
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
            label="Name* "
            name="displayName"
            id="displayName"
            type="text"
            placeholder="User name"
            prefix={<FieldIcon type="user" />}
          />
          <Field
            label="Email* "
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
            label="Password* "
            name="password"
            id="password"
            type="password"
            placeholder="Password"
            prefix={<FieldIcon type="lock" />}
          />
          <Field
            label="Confirm Password* "
            name="repeatPassword"
            id="repeatPassword"
            type="password"
            placeholder="Confirm Password"
            prefix={<FieldIcon type="lock" />}
          />
          <div>
            <Button
              disabled={objectLen(formik.errors) ? true : false}
              htmlType="submit"
              type="primary"
              size={'large'}
              block={true}
              style={{
                padding: '0 40px'
              }}
            >
              Register
            </Button>
            <GoogleAuthButton setLoading={setSubmiting} />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
