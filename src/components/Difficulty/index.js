import React from 'react';
import { useAppState } from '../../store/app-state';
import { Select, Button } from 'antd';
import Container from '../utilsComponents/Container';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import { useCategory } from '../../hooks/useCategory';

const { Option } = Select;

export default function() {
  const [{ game }, dispatch] = useAppState();
  const category = useCategory(game.choosedCategory);
  console.log(category);
  const handleChange = value => {
    dispatch({ type: 'CHANGE_GAME_STATE', game: { choosedDifficulty: value } });
  };
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
            defaultValue={game.choosedDifficulty}
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
            >
              Start game!
            </Button>
          </Link>
        </div>
      </Container>
    </animated.div>
  );
}
