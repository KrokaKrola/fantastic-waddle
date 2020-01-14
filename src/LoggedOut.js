import React from 'react';
import {Row, Col, Tabs} from 'antd';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';

const { TabPane } = Tabs;

const LoggedOut = () => {
  return (
    <Row>
      <Col span={6} offset={9}>
        <Tabs defaultActiveKey="register">
          <TabPane tab="Register" key="register">
            <RegisterForm />
          </TabPane>
          <TabPane tab="Login" key="login">
            <LoginForm />
          </TabPane>
        </Tabs>
      </Col>
    </Row>
  );
};

export default LoggedOut;
