import React, { useState, useEffect } from 'react';
import Container from '../utilsComponents/Container';
import { Button } from 'antd';
import { shuffle } from '../../helpers/utils';

export default function Question({ question, setActiveQuestion, ...rest }) {
  const [answers, setAnswers] = useState([]);
  const [buttonState, setButtonState] = useState(true);

  useEffect(() => {
    setAnswers(
      shuffle([question.correct_answer, ...question.incorrect_answers])
    );
  }, [question.correct_answer, question.incorrect_answers]);
  return (
    <Container>
      <h2
        style={{ fontSize: '2rem', textAlign: 'center', margin: '40px 0' }}
        dangerouslySetInnerHTML={{ __html: question.question }}
      />
      {answers.map((item, index) => (
        <Answer key={index} name={item} clickHandler={setButtonState} />
      ))}
      <Button
        type="primary"
        size="large"
        style={{ width: 320 }}
        disabled={buttonState}
        onClick={() => {
          setButtonState(true);
          setActiveQuestion(prevState => prevState + 1);
        }}
      >
        Next question
      </Button>
    </Container>
  );
}

const Answer = ({ name, clickHandler }) => {
  return <div onClick={() => clickHandler(false)}>{name}</div>;
};
