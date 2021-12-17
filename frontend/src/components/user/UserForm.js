import React, { useEffect } from 'react';
import { Form, Input, Button, Row, Col, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { AiOutlineLogin, AiOutlineMail } from 'react-icons/ai';
import { addUser } from 'store/action/user.action';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import routeList from 'utils/routeList';

const UserForm = ({ addUser, errors }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = (values) => {
    addUser(values, (result) => {
      if (result) {
        message.success('User created successfully! Redirecting.....', 1);
        form.resetFields();

        setTimeout(() => {
          navigate(routeList.user.view);
        }, 1300);
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
      <Row>
        <Col span={24}>
          <Form name='normal_login' form={form} onFinish={onFinish}>
            <Row gutter={10}>
              <Col span={12}>
                <Form.Item
                  name='name'
                  rules={[
                    {
                      required: true,
                      message: 'Name is required!',
                    },
                  ]}
                  key='name'
                >
                  <Input
                    prefix={<UserOutlined />}
                    type='text'
                    placeholder='Name'
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name='username'
                  rules={[
                    {
                      required: true,
                      message: 'Username is required!',
                    },
                  ]}
                  key='username'
                >
                  <Input
                    prefix={<AiOutlineLogin />}
                    type='text'
                    placeholder='Username'
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  name='email'
                  rules={[
                    {
                      required: true,
                      message: 'Email is required!',
                    },
                    {
                      type: 'email',
                      message: 'Email must be valid!',
                    },
                  ]}
                  key='email'
                >
                  <Input
                    prefix={<AiOutlineMail />}
                    type='text'
                    placeholder='Email Address'
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <Button type='primary' htmlType='submit'>
                Add User
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { errors, type } = state.user;

  return {
    errors: type === 'add' ? errors : {},
  };
};

export default connect(mapStateToProps, { addUser })(UserForm);
