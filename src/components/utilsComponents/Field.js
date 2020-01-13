import React from 'react';
import { useField } from 'formik';
import { FormControl } from 'react-bootstrap';
import './Field.css';
// import posed from 'react-pose';

// const ShakePose = posed.div({
//   shake: {
//     applyAtEnd: { x: 0 },
//     applyAtStart: { x: -10 },
//     x: 0,
//     transition: {
//       type: 'spring',
//       stiffness: 1000,
//       damping: 10,
//       duration: 4
//     }
//   }
// });

export default function Field({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <FormControl
        className={`textInput ${meta.error ? 'textInput--error' : ''}`}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
}
