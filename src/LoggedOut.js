import React from 'react';
import { Container, Tabs, Col, Tab } from 'react-bootstrap';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';

const LoggedOut = () => {
  return (
    <Container>
      <Col xs={{ span: 6, offset: 3 }}>
        <Tabs defaultActiveKey="register">
          <Tab title="Register" eventKey="register">
            <RegisterForm />
          </Tab>
          <Tab title="Login" eventKey="login">
            <LoginForm />
          </Tab>
        </Tabs>
      </Col>
    </Container>
  );
};

export default LoggedOut;
