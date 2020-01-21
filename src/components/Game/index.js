import React, { useState } from 'react';
import useQuestions from '../../hooks/useQuestions';
import { useAppState } from '../../store/app-state';
import SpinnerContainer from '../utilsComponents/SpinnerContainer';
import Question from './Question';
import { Progress } from 'antd';

export default function() {
  const [{ game }] = useAppState();
  const [questions, loading] = useQuestions(
    game.choosedCategory,
    game.choosedDifficulty
  );
  const [activeQuestion, setActiveQuestion] = useState(0);
  return (
    <div style={{ position: 'relative', minHeight: 200 }}>
      <SpinnerContainer loading={loading} />
      {!loading &&
        (questions[activeQuestion] ? (
          <>
            <Progress
              percent={(activeQuestion / questions.length) * 100}
              strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068'
              }}
              showInfo={false}
            />
            <Question
              question={questions[activeQuestion]}
              setActiveQuestion={setActiveQuestion}
            />
          </>
        ) : (
          'Game over'
        ))}
    </div>
  );
}