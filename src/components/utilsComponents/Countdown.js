import React from "react";
import { Statistic } from "antd";
import styled from "styled-components";

const { Countdown } = Statistic;

const CountdownBlock = styled(Countdown)`
  transition: 0.2s ease;
  .ant-statistic-content {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    .ant-statistic-content-suffix {
      font-size: inherit;
    }
    .ant-statistic-content-value {
      color: tomato;
    }
  }
`;

export default function(props) {
  return <CountdownBlock {...props} />;
}
