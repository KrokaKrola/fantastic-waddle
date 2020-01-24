import React, { useState, useMemo } from 'react';
import Container from '../utilsComponents/Container';
import { Tooltip } from 'antd';
import { shuffle } from '../../helpers/utils';
import { Name, NextQuestionButton } from '../utilsComponents/QuestionParts';
import Answer from './Answer';
import { Helmet } from 'react-helmet';
export default function Question({
  question,
  setActiveQuestion,
  setScore,
  set,
  setcountDownNeed
}) {
  const [answers, setAnswers] = useState([]);
  const [buttonState, setButtonState] = useState(true);
  const [choosedAnswer, setChoosedAnswer] = useState('');
  const {
    correct_answer,
    incorrect_answers,
    question: questionText
  } = question;

  useMemo(() => {
    setAnswers(shuffle([correct_answer, ...incorrect_answers]));
    set(true);
  }, [correct_answer, incorrect_answers, set]);

  function correctAnswerState(currentItem, states) {
    const { initial, correct, choosed_incorrect, incorrect } = states;
    return buttonState
      ? initial
      : currentItem === correct_answer
      ? correct
      : choosedAnswer === correct_answer
      ? ''
      : choosedAnswer === currentItem
      ? choosed_incorrect
      : incorrect;
  }

  return (
    <Container style={{ maxWidth: 680 }}>
      <Helmet>
        <title>Trivia | Game</title>
      </Helmet>
      <Name dangerouslySetInnerHTML={{ __html: questionText }} />
      {answers.map((item, index) => (
        <Tooltip
          key={index}
          title={correctAnswerState(item, {
            initial: 'Choose correct answer',
            correct: 'Correct answer',
            choosed_incorrect: 'Wrong choosed answer',
            incorrect: 'Incorrect answer'
          })}
        >
          <Answer
            name={item}
            buttonState={buttonState}
            clickHandler={setButtonState}
            setChoosedAnswer={setChoosedAnswer}
            setScore={setScore}
            correctAnswer={correct_answer}
            setcountDownNeed={setcountDownNeed}
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
          set(false);
          setcountDownNeed(true);
        }}
      >
        Next question
      </NextQuestionButton>
    </Container>
  );
}
