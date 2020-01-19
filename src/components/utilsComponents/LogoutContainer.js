import React from 'react';
import { animated } from "react-spring";
import styled from 'styled-components';

const LoggedOutContainer = styled(animated.div)`
    background: white;
    max-width: 560px;
    margin: auto;
    padding: 40px;
    width: 100%;
    border: 1px solid #fafafa;
    box-shadow: 0 0 25px rgba(0,0,0,0.05);
    transition: .2s ease;
    &:hover {
      box-shadow: 0 0 35px rgba(0,0,0, 0.07);
    }
`;


export default function LogoutContainer({children, ...rest}) {
  return (
    <LoggedOutContainer children={children} {...rest} />
  )
}
