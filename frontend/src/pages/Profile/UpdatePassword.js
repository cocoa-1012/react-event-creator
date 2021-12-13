import React, { useEffect } from 'react';
import { Row, Col, Button, Typography } from 'antd';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import UpdatePasswordForm from 'components/profile/UpdatePasswordForm';
import { useSelector } from 'react-redux';
import routeList from 'utils/routeList';
import useSetTitle from 'hook/setTitle';
import useQuery from 'hook/useQuery';

const UpdatePassword = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { isPassReset } = useSelector((state) => state.auth.me);
  useSetTitle('Update Password');
  const navigate = useNavigate();
  const message = useQuery('message');

  useEffect(() => {
    if (isPassReset && message) {
      navigate(routeList.event.view);
    }
  }, [isPassReset, navigate, message]);

  if (!isAuthenticated) {
    return <Navigate to='/' />;
  }
  return (
    <>
      <Typography.Title level={4} type='danger'>
        {message}
      </Typography.Title>
      <Row justify='space-between'>
        <Col>
          <h2>Update password</h2>
        </Col>
        <Col>
          <Button type='primary'>
            <Link to={routeList.profile.view}>Go To Profile</Link>
          </Button>
        </Col>
      </Row>
      <UpdatePasswordForm />
    </>
  );
};

export default UpdatePassword;
