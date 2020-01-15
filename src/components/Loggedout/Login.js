import React from 'react';
import { Formik } from 'formik';
import { Button, Form } from 'antd';
import { signInWithEmailAndPassword, objectLen } from '../../utils';
import Field, { FieldIcon } from '../utilsComponents/Field';
import { minError, required, emailError } from '../../errorMessages';
import * as Yup from 'yup';
import GoogleAuthButton from './GoogleAuthButton';

const LoginForm = ({ setSubmiting }) => {
  async function emailPaswordLoginHandler(event) {
    event.preventDefault();
    const [loginEmail, loginPassword] = event.target.elements;
    try {
      await signInWithEmailAndPassword({
        email: loginEmail.value,
        password: loginPassword.value
      });
    } catch (error) {}
  }

  return (
    <Formik
      initialValues={{ loginEmail: '', loginPassword: '' }}
      validationSchema={Yup.object({
        loginEmail: Yup.string()
          .email(emailError)
          .required(required),
        loginPassword: Yup.string()
          .min(6, minError(6))
          .required(required)
      })}
      onSubmit={values => {
        emailPaswordLoginHandler(values);
      }}
    >
      {formik => (
        <Form onSubmit={formik.handleSubmit} layout="horizontal">
          <Field
            label="Email"
            name="loginEmail"
            id="loginEmail"
            type="email"
            placeholder="Email"
            prefix={<FieldIcon type="user" />}
          />
          <Field
            label="Password"
            name="loginPassword"
            id="loginPassword"
            type="password"
            placeholder="Password"
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
              Log in
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

export default LoginForm;
