import { Form, Button, Input, Row, Col, message } from 'antd';
import { AiFillLock } from 'react-icons/ai';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { updatePassword } from 'store/action/auth.action';
import { useNavigate } from 'react-router-dom';

const UpdatePasswordForm = ({ updatePassword, errors }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const onFinish = (values) => {
    updatePassword(values, (result) => {
      if (result) {
        message.success('Redirecting....');
        setTimeout(() => {
          navigate('/profile');
        }, 2000);
      }
    });
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
    <div>
      <Form name='normal_login' onFinish={onFinish} form={form}>
        <Row gutter={10}>
          <Col span={24}>
            <Form.Item
              name='oldPassword'
              rules={[
                {
                  required: true,
                  message: 'Old password is required!',
                },
              ]}
              key='oldPassword'
            >
              <Input.Password
                prefix={<AiFillLock />}
                type='text'
                placeholder='Old Password'
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='newPassword'
              dependencies={['confirmPassword']}
              rules={[
                {
                  required: true,
                  message: 'New password is required!',
                },
              ]}
              key='newPassword'
            >
              <Input.Password
                prefix={<AiFillLock />}
                type='text'
                placeholder='New Password'
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='confirmPassword'
              dependencies={['newPassword']}
              rules={[
                {
                  required: true,
                  message: 'Confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    const { newPassword } = getFieldValue();

                    if (newPassword === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject("Password didn't match!");
                  },
                }),
              ]}
              key='confirmPassword'
            >
              <Input.Password
                prefix={<AiFillLock />}
                type='text'
                placeholder='Confirm password'
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Update Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { errors, errorType } = state.auth;

  return {
    errors: errorType === 'password' ? errors : {},
  };
};

export default connect(mapStateToProps, { updatePassword })(UpdatePasswordForm);
