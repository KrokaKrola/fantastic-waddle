import React from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';

const SpinnerContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: ${props => (props.loading === 'true' ? '' : 'none')};
`;

export default function({ loading }) {
  return (
    <SpinnerContainer loading={loading.toString()}>
      <Spin spinning={loading} />
    </SpinnerContainer>
  );
}
