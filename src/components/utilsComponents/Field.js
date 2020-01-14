import React from 'react';
import { useField } from 'formik';
import { Input, Form } from 'antd';

export default function Field({ label, ...props }) {
  const [field, meta] = useField(props);
  const errorState = meta.touched && meta.error;
  return (
    <Form.Item
      help={errorState ? meta.error : ''}
      validateStatus={errorState ? 'error' : 'validating'}
    >
      <label htmlFor={props.id || props.name}>{label}</label>
      <Input size="large" {...field} {...props} />
    </Form.Item>
  );
}
