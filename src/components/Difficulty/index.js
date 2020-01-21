import React, { useState, useCallback, useEffect } from 'react';
import { useAppState } from '../../store/app-state';
import { Select, Button } from 'antd';
import Container from '../utilsComponents/Container';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import { useCategory } from '../../hooks/useCategory';
import { setWarning } from '../../helpers/utils';

const { Option } = Select;

export default function() {
  const [{ game }, dispatch] = useAppState();
  const [disabled, setDisabled] = useState(false);
  const category = useCategory(game.choosedCategory);
  const handleChange = value => {
    enouthCheker(value);
  };
  const enouthCheker = useCallback(
    value => {
      if (value === 'any' && category.total_question_count < 10) {
        setDisabled(true);
        setWarning(
          `This category has not enough questions`,
          'Please select another difficulty or another category'
        );
        dispatch({
          type: 'CHANGE_GAME_STATE',
          game: { choosedDifficulty: null }
        });
      } else if (category[`total${'_' + value}_question_count`] < 10) {
        setDisabled(true);
        setWarning(
          `This category has not enough ${value} questions`,
          'Please select another difficulty or another category'
        );
        dispatch({
          type: 'CHANGE_GAME_STATE',
          game: { choosedDifficulty: null }
        });
      } else {
        setDisabled(false);
        dispatch({
          type: 'CHANGE_GAME_STATE',
          game: { choosedDifficulty: value }
        });
      }
    },
    [category, dispatch]
  );
  useEffect(() => {
    category && enouthCheker(game.choosedDifficulty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, enouthCheker]);
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
      <Container>
        <div>
          <h2
            style={{
              fontSize: '32px',
              fontWeight: 'bold',
              textAlign: 'center',
              margin: '60px 0'
            }}
          >
            Choose Difficulty and Start Game!
          </h2>
          <Select
            defaultValue={game.choosedDifficulty || 'any'}
            style={{ width: '320px', display: 'block', margin: '0 auto 40px' }}
            size="large"
            onChange={handleChange}
          >
            <Option value="any">Any Difficulty</Option>
            <Option value="easy">Easy</Option>
            <Option value="medium">Medium</Option>
            <Option value="hard">Hard</Option>
          </Select>
          <Link to="/game">
            <Button
              type="primary"
              icon="poweroff"
              size="large"
              style={{ width: 320, display: 'block', margin: '0 auto' }}
              disabled={disabled}
            >
              Start game!
            </Button>
          </Link>
        </div>
      </Container>
    </animated.div>
  );
}
