import React, { useState } from 'react';
import { Row, Col, Tabs, Spin } from 'antd';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';

const { TabPane } = Tabs;

const LoggedOut = () => {
  const [submiting, setSubmiting] = useState(false);
  return (
    <Spin spinning={submiting}>
      <Row style={{ display: 'flex', justifyContent: 'center' }}>
        <Col span={8}>
          <Tabs defaultActiveKey="register">
            <TabPane tab="Register" key="register">
              <RegisterForm setSubmiting={setSubmiting} />
            </TabPane>
            <TabPane tab="Login" key="login">
              <LoginForm />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </Spin>
  );
};

export default LoggedOut;
