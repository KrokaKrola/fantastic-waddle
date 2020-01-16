import React from 'react';
import { useField } from 'formik';
import { Input, Form, Icon } from 'antd';

const FormItem = Form.Item;

export default function Field({ label, ...props }) {
  const [field, meta] = useField(props);
  const errorState = meta.touched && meta.error;
  sessionStorage.setItem(field.name, field.value);
  return (
    <FormItem
      label={label}
      htmlFor={props.id}
      help={errorState}
      validateStatus={errorState ? 'error' : 'success'}
      labelCol={{ span: 7 }}
      wrapperCol={{ span: 17 }}
    >
      {props.type === 'password' ? (
        <Input.Password size="large" {...field} {...props} />
      ) : (
        <Input size="large" {...field} {...props} />
      )}
    </FormItem>
  );
}

export const FieldIcon = ({ type }) => {
  return <Icon type={type} style={{ color: 'rgba(0,0,0,.25)' }} />;
};