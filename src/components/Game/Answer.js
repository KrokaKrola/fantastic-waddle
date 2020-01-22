import React from 'react';
import styled from 'styled-components';

const AnswerWrapper = styled.div`
  height: 70px;
  border: 1px solid #cacaca;
  padding: 20px;
  font-size: 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  transition: 0.2s ease;
  cursor: pointer;

  &.correct_answer {
    border: 5px solid green;
    background: rgba(0, 128, 0, 0.2);
    cursor: help;
    font-weight: bold;
  }

  &.choosed_incorrect_answer {
    border: 5px solid rgb(47, 79, 79);
    background: rgba(47, 79, 79, 0.1);
    font-weight: bold;
    cursor: help;
  }

  &.incorrect_answer {
    border: 5px solid tomato;
    background: rgba(255, 99, 71, 0.15);
    cursor: help;
    font-weight: bold;
    color: tomato;
  }
`;

export default function Answer({
  name,
  buttonState,
  clickHandler,
  setChoosedAnswer,
  setScore,
  correctAnswer,
  setcountDownNeed,
  ...rest
}) {
  return (
    <AnswerWrapper
      {...rest}
      onClick={() => {
        if (buttonState) {
          clickHandler(false);
          setChoosedAnswer(name);
          setScore(prevState =>
            correctAnswer === name ? prevState + 1 : prevState
          );
          setcountDownNeed(false);
        }
      }}
    >
      {name}
    </AnswerWrapper>
  );
}
