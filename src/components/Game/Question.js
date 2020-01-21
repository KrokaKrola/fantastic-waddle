import React, { useState, useMemo } from 'react';
import Container from '../utilsComponents/Container';
import { Tooltip } from 'antd';
import { shuffle } from '../../helpers/utils';
import { Name, NextQuestionButton } from '../utilsComponents/QuestionParts';
import Answer from './Answer';

export default function Question({ question, setActiveQuestion, ...rest }) {
  const [answers, setAnswers] = useState([]);
  const [buttonState, setButtonState] = useState(true);
  const [choosedAnswer, setChoosedAnswer] = useState('');

  useMemo(() => {
    setAnswers(
      shuffle([question.correct_answer, ...question.incorrect_answers])
    );
  }, [question.correct_answer, question.incorrect_answers]);

  function correctAnswerState(currentItem, states) {
    return buttonState
      ? states.initial
      : currentItem === question.correct_answer
      ? states.correct
      : choosedAnswer === question.correct_answer
      ? ''
      : choosedAnswer === currentItem
      ? states.choosed_incorrect
      : states.incorrect;
  }

  return (
    <Container style={{ maxWidth: 680 }}>
      <Name dangerouslySetInnerHTML={{ __html: question.question }} />
      {answers.map((item, index) => (
        <Tooltip
          title={correctAnswerState(item, {
            initial: 'Choose correct answer',
            correct: 'Correct answer',
            choosed_incorrect: 'Wrong choosed answer',
            incorrect: 'Incorrect answer'
          })}
        >
          <Answer
            key={index}
            name={item}
            buttonState={buttonState}
            clickHandler={setButtonState}
            setChoosedAnswer={setChoosedAnswer}
            className={correctAnswerState(item, {
              initial: '',
              correct: 'correct_answer',
              choosed_incorrect: 'choosed_incorrect_answer',
              incorrect: 'incorrect_answer'
            })}
          />
        </Tooltip>
      ))}
      <NextQuestionButton
        disabled={buttonState}
        onClick={() => {
          setButtonState(true);
          setActiveQuestion(prevState => prevState + 1);
        }}
      >
        Next question
      </NextQuestionButton>
    </Container>
  );
}
