import React from "react";
import { Icon } from "antd";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";

export const RunOutOfTime = ({ score, length }) => {
  const fade = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1
    }
  });
  return (
    <animated.div style={fade}>
      <GameResultHeader
        style={{
          color: "tomato"
        }}
      >
        Run out of time.{" "}
        <Icon type="frown" theme="twoTone" twoToneColor="red" />
      </GameResultHeader>
      <GameResultSubheader>
        Your score: {score} of {length} questions
      </GameResultSubheader>
      <SmiledSection>{smileCases(score)}</SmiledSection>
    </animated.div>
  );
};

export const GameOver = ({ score, length }) => {
  const fade = useSpring({
    from: {
      opacity: 0
    },
    to: {
      opacity: 1
    }
  });
  return (
    <animated.div style={fade}>
      <GameResultHeader style={{ color: "purple" }}>
        Contgratz ! You finished the GAME !!!{" "}
        <Icon type="smile" theme="twoTone" twoToneColor="lightcoral" />
      </GameResultHeader>
      <GameResultSubheader>
        Your score: {score} of {length} questions
      </GameResultSubheader>
      <SmiledSection>{smileCases(score)}</SmiledSection>
    </animated.div>
  );
};

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
        <Icon type="frown" theme="twoTone" twoToneColor="brown" />
      </>
    );
  } else if (score >= 5 && score < 8) {
    return (
      <>
        <Icon type="smile" theme="twoTone" twoToneColor="purple" />
      </>
    );
  } else if (score >= 8 && score <= 10) {
    return (
      <>
        <Icon type="smile" theme="twoTone" twoToneColor="lightcoral" />
        <Icon type="fire" theme="filled" style={{ color: "red" }} />
        <Icon type="smile" theme="twoTone" twoToneColor="lightcoral" />
      </>
    );
  }
};

const SmiledSection = styled.div`
  font-size: 5rem;
  display: flex;
  justify-content: center;
  i {
    margin: 7.5px;
  }
`;

const GameResultHeader = styled.h2`
  font-size: 3.25rem;
  text-align: center;
  font-style: italic;
  font-weight: bold;
  margin-bottom: 20px;
  margin-top: 15vh;
`;

const GameResultSubheader = styled.h3`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`;
