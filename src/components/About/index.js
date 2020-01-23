import React from 'react';
import Container from '../utilsComponents/Container';
import { Icon } from 'antd';

export const About = () => {
  return (
    <Container style={{ maxWidth: 560 }}>
      <h3
        style={{
          marginTop: '15vh',
          marginBottom: 30,
          fontSize: '1.5rem',
          textAlign: 'center',
          fontWeight: 'bold'
        }}
      >
        Created with Open Trivia DATABASE API{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://opentdb.com/"
          style={{ fontStyle: 'italic' }}
        >
          opentdb.com
        </a>
      </h3>
      <h3
        style={{ fontSize: '1.5rem', textAlign: 'center', fontWeight: 'bold' }}
      >
        My contacts:
      </h3>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.25rem'
        }}
      >
        <p
          style={{
            margin: '0 15px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          Github:{' '}
          <a
            style={{
              fontSize: '2.5rem',
              marginLeft: 15,
              color: 'black'
            }}
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/KrokaKrola"
          >
            <Icon type="github" />
          </a>
        </p>
        <p
          style={{
            margin: '0 15px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          Email:
          <a
            style={{
              fontSize: '2.5rem',
              marginLeft: 15,
              color: 'black'
            }}
            href="mailto:harlamsan@gmail.com"
          >
            <Icon type="google" />
          </a>
        </p>
        <p
          style={{
            margin: '0 15px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          Twitter:
          <a
            style={{
              fontSize: '2.5rem',
              marginLeft: 15,
              color: 'black'
            }}
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com/LonelyArlekin"
          >
            <Icon type="twitter" />
          </a>
        </p>
      </div>
    </Container>
  );
};
