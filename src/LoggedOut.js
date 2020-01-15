import React, { useState } from 'react';
import { Row, Col, Tabs, Spin } from 'antd';
import Login from './components/Loggedout/Login'
import Register from './components/Loggedout/Register';

const { TabPane } = Tabs;

const LoggedOut = () => {
  const [submiting, setSubmiting] = useState(false);
  return (
    <Spin spinning={submiting}>
      <Row style={{ display: 'flex', justifyContent: 'center' }}>
        <Col span={8}>
          <Tabs defaultActiveKey="register">
            <TabPane tab="Register" key="register">
              <Register setSubmiting={setSubmiting} />
            </TabPane>
            <TabPane tab="Login" key="login">
              <Login setSubmiting={setSubmiting} />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </Spin>
  );
};

export default LoggedOut;
