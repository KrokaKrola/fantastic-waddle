import { useSpring, animated } from 'react-spring';

export const useFade = (config = {}) => {
  const fade = useSpring({
    from: {
      opacity: 0
    },
    to: {
      opacity: 1
    },
    config
  });

  return [fade, animated];
};
