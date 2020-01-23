import React, { useState, useCallback, useEffect } from 'react';
import { useAppState } from '../../store/app-state';
import { Select, Button } from 'antd';
import Container from '../utilsComponents/Container';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import { useCategory } from '../../hooks/useCategory';
import { setWarning } from '../../helpers/utils';
import SpinnerContainer from '../utilsComponents/SpinnerContainer';
import LinkText from '../utilsComponents/LinkText';

const { Option } = Select;

export default function() {
  const [{ game }, dispatch] = useAppState();
  const [disabled, setDisabled] = useState(false);
  const [category, loading] = useCategory(game.choosedCategory);
  const [selectValue, setSelectValue] = useState('any');
  const handleChange = value => {
    setSelectValue(value);
    enouthCheker();
  };
  const enouthCheker = useCallback(() => {
    if (selectValue === 'any' && category.total_question_count < 10) {
      setDisabled(true);
      setWarning(
        `This category has not enough questions`,
        'Please select another difficulty or another category'
      );
      dispatch({
        type: 'CHANGE_GAME_STATE',
        game: { choosedDifficulty: null }
      });
    } else if (category[`total${'_' + selectValue}_question_count`] < 10) {
      setDisabled(true);
      setWarning(
        `This category has not enough ${selectValue} questions`,
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
        game: { choosedDifficulty: selectValue }
      });
    }
  }, [selectValue, dispatch, category]);
  useEffect(() => {
    if (!!category) {
      enouthCheker();
    }
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
      <Container style={{ position: 'relative', minHeight: 200 }}>
        <SpinnerContainer loading={loading} />
        {!loading && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Link to="/category">
                <LinkText>Back to categories</LinkText>
              </Link>
            </div>
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
              defaultValue={selectValue}
              style={{
                width: '320px',
                display: 'block',
                margin: '0 auto 40px'
              }}
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
        )}
      </Container>
    </animated.div>
  );
}
