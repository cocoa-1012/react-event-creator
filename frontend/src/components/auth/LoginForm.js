import React, { useEffect } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';
import { loginAction } from 'store/action/auth.action';

const useStyles = createUseStyles({
  form: {
    width: '360px',
    background: 'white',
    padding: '40px',
    borderRadius: 5,
  },
  button: {
    width: '100%',
  },
  title: {
    textAlign: 'center',
  },
});

const LoginForm = ({ loginAction, errors }) => {
  const classes = useStyles();
  const [form] = Form.useForm();
  const onFinish = (values) => {
    loginAction(values);
  };
  useEffect(() => {
    const errorObject =
      Object.keys(errors).length > 0
        ? Object.entries(errors).map(([name, value]) => {
            return {
              name,
              errors: [value],
            };
          })
        : [];
    form.setFields(errorObject);
  }, [errors, form]);
  return (
    <Form
      name='normal_login'
      className={classes.form}
      onFinish={onFinish}
      form={form}
    >
      <Typography.Title className={classes.title}>Login Here</Typography.Title>
      <Form.Item
        name='username'
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
        key='username'
      >
        <Input prefix={<UserOutlined />} type='text' placeholder='Username' />
      </Form.Item>

      <Form.Item
        name='password'
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
        key='password'
      >
        <Input.Password
          prefix={<LockOutlined />}
          type='password'
          placeholder='Password'
        />
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit' className={classes.button}>
          Log in
        </Button>
      </Form.Item>

      {/* <Form.Item>
        <a className='login-form-forgot' href='/'>
          Forgot password
        </a>
      </Form.Item> */}
    </Form>
  );
};

const mapStateToProps = (state) => {
  const { errors, errorType } = state.auth;
  return {
    errors: errorType === 'login' ? errors : {},
  };
};
const functions = { loginAction };

export default connect(mapStateToProps, functions)(LoginForm);
