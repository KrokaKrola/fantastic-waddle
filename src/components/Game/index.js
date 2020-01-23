import React, { useState } from 'react';
import useQuestions from '../../hooks/useQuestions';
import { useAppState } from '../../store/app-state';
import SpinnerContainer from '../utilsComponents/SpinnerContainer';
import Question from './Question';
import { Progress } from 'antd';
import styled from 'styled-components';
import { useTransition, animated } from 'react-spring';
import { RunOutOfTime, GameOver } from './GameOver';
import CountdownBlock from '../utilsComponents/Countdown';

export default function() {
  const [{ game }] = useAppState();
  const [questions, loading] = useQuestions(
    game.choosedCategory,
    game.choosedDifficulty
  );
  const [activeQuestion, setActiveQuestion] = useState(0);
  const countdownTime = Date.now() + 1000 * 30;
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
                    {game.choosedCategory === 1 ? (
                      <div
                        style={{
                          fontSize: '1rem',
                          fontWeight: '700',
                          fontStyle: 'italic',
                          textAlign: 'center',
                          position: 'relative',
                          top: '20px'
                        }}
                      >
                        Category: {questions[activeQuestion].category}
                      </div>
                    ) : null}
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

const ProgressBar = styled(Progress)`
  height: 15px;
  border-radius: 0;
  position: absolute;
  top: -45px;
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

const AnimatedWrapper = styled(animated.div)`
  max-width: 680px;
  margin: 0 auto;
  position: relative;
`;
