import React, { useState } from 'react';
import useQuestions from '../../hooks/useQuestions';
import { useAppState } from '../../store/app-state';
import SpinnerContainer from '../utilsComponents/SpinnerContainer';
import Question from './Question';
import { Progress, Statistic, Icon } from 'antd';
import styled from 'styled-components';
import { useTransition, animated } from 'react-spring';

const { Countdown } = Statistic;

const ProgressBar = styled(Progress)`
  height: 15px;
  border-radius: 0;
  position: absolute;
  top: -45px;
  transition: 0.2s ease;
  * {
    border-radius: 0;
  }
  .ant-progress-inner {
    height: 15px;
  }
  .ant-progress-bg {
    height: 15px !important;
  }
`;

const CountdownBlock = styled(Countdown)`
  transition: 0.2s ease;
  .ant-statistic-content {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    .ant-statistic-content-suffix {
      font-size: inherit;
    }
    .ant-statistic-content-value {
      color: tomato;
    }
  }
`;

const AnimatedWrapper = styled(animated.div)`
  max-width: 680px;
  margin: 0 auto;
  position: relative;
`;

export default function() {
  const [{ game }] = useAppState();
  const [questions, loading] = useQuestions(
    game.choosedCategory,
    game.choosedDifficulty
  );
  const [activeQuestion, setActiveQuestion] = useState(0);
  const countdownTime = Date.now() + 1000 * 3;
  const [score, setScore] = useState(0);
  const [show, set] = useState(true);
  const [countDownNeed, setcountDownNeed] = useState(true);
  const transitions = useTransition(show, null, {
    from: {
      opacity: 0,
      position: 'absolute',
      top: 0,
      left: 0,
      transform: `translate3d(-50%, 0, 0)`
    },
    enter: {
      opacity: 1,
      position: 'relative',
      transform: `translate3d(0, 0, 0)`
    },
    leave: {
      opacity: 0,
      position: 'absolute',
      transform: `translate3d(50%, 0, 0)`
    }
  });
  return (
    <div style={{ position: 'relative', minHeight: 200 }}>
      <SpinnerContainer loading={loading} />
      <ProgressBar
        percent={(activeQuestion / questions.length) * 100}
        strokeColor={{
          '0%': 'rgb(130, 67, 182)',
          '100%': '#1890ff'
        }}
        status="active"
        showInfo={false}
        strokeLinecap="square"
        style={!!questions[activeQuestion] ? { opacity: 1 } : { opacity: 0 }}
      />
      <div
        style={{ position: 'relative', maxWidth: '680px', margin: '0 auto' }}
      >
        {!loading &&
          (!!questions[activeQuestion] ? (
            transitions.map(
              ({ item, props, key }) =>
                item && (
                  <AnimatedWrapper key={key} style={props}>
                    <CountdownBlock
                      value={countDownNeed ? countdownTime : 0}
                      style={countDownNeed ? { opacity: 1 } : { opacity: 0 }}
                      onFinish={() =>
                        countDownNeed ? setActiveQuestion('time') : ''
                      }
                      format="s"
                      suffix={' seconds left to answer the question!'}
                      prefix={'You have '}
                    />
                    <Question
                      question={questions[activeQuestion]}
                      setActiveQuestion={setActiveQuestion}
                      setScore={setScore}
                      set={set}
                      setcountDownNeed={setcountDownNeed}
                    />
                  </AnimatedWrapper>
                )
            )
          ) : activeQuestion === 'time' ? (
            <RunOutOfTime score={score} length={questions.length} />
          ) : (
            <GameOver score={score} length={questions.length} />
          ))}
      </div>
    </div>
  );
}

const smileCases = score => {
  if (score === 0) {
    return (
      <>
        <Icon type="meh" theme="twoTone" twoToneColor="gray" />
        <Icon type="meh" theme="twoTone" twoToneColor="gray" />
        <Icon type="meh" theme="twoTone" twoToneColor="gray" />
      </>
    );
  } else if (score > 0 && score < 5) {
    return (
      <>
        <Icon type="frown" theme="twoTone" twoToneColor="lightgray" />
      </>
    );
  } else if (score > 5 && score < 8) {
    return (
      <>
        <Icon type="smile" theme="twoTone" twoToneColor="blue" />
      </>
    );
  } else if (score > 8 && score <= 10) {
    return (
      <>
        <Icon type="smile" theme="twoTone" twoToneColor="green" />
        <Icon type="fire" theme="twoTone" twoToneColor="green" />
        <Icon type="smile" theme="twoTone" twoToneColor="green" />
      </>
    );
  }
};

const RunOutOfTime = ({ score, length }) => {
  return (
    <div>
      <h2
        style={{
          fontSize: '3.25rem',
          textAlign: 'center',
          fontStyle: 'italic',
          fontWeight: 'bold',
          marginBottom: '20px',
          marginTop: '15vh',
          color: 'tomato'
        }}
      >
        Run out of time.{' '}
        <Icon type="frown" theme="twoTone" twoToneColor="red" />
      </h2>
      <h3
        style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          marginBottom: '20px',
          textAlign: 'center'
        }}
      >
        Your score: {score} of {length} questions
      </h3>
      <span
        className="smileSection"
        style={{ fontSize: '5rem', display: 'flex', justifyContent: 'center' }}
      >
        {smileCases(score)}
      </span>
    </div>
  );
};

const GameOver = ({ score, length }) => {
  return (
    <div>
      <h1>
        Congrats <Icon type="smile" />
      </h1>
      <h2>GAME OVER !!!</h2>
      <h3>
        Your score: {score} of {length} questions
      </h3>
      <span
        className="smileSection"
        style={{ fontSize: '5rem', display: 'flex', justifyContent: 'center' }}
      >
        {smileCases(score)}
      </span>
    </div>
  );
};
