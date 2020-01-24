import React from 'react';
import { useAppState } from '../../store/app-state';
import Container from '../utilsComponents/Container';
import { Statistic, Row, Col, Icon, Card } from 'antd';
import { Helmet } from 'react-helmet';
import { useFade } from '../../hooks/useFade';
export default function User() {
  const [{ user }] = useAppState();
  const [fade, animated] = useFade();

  return (
    <animated.div style={fade}>
      <Helmet>
        <title>Trivia | {user.displayName}</title>
      </Helmet>
      <Container style={{ maxWidth: 560 }}>
        <Row gutter={16}>
          <Col span={12}>
            <Statistic
              title="Total answered questions"
              value={user.totalQuestions}
              prefix={<Icon type="like" />}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Correct answers statistic"
              value={user.correctAnswers}
              suffix={` / ${user.totalQuestions}`}
            />
          </Col>
        </Row>
        <div style={{ background: '#ECECEC', padding: '30px', marginTop: 40 }}>
          <Row gutter={16}>
            <Col span={12}>
              <Card>
                <Statistic
                  title="Correct answers"
                  value={
                    (user.correctAnswers / (user.totalQuestions || 1)) * 100
                  }
                  precision={2}
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<Icon type="arrow-up" />}
                  suffix="%"
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card>
                <Statistic
                  title="Wrong answers"
                  value={(user.wrongAnswers / (user.totalQuestions || 1)) * 100}
                  precision={2}
                  valueStyle={{ color: '#cf1322' }}
                  prefix={<Icon type="arrow-down" />}
                  suffix="%"
                />
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </animated.div>
  );
}
