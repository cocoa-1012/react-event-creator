import UpdatePasswordForm from 'components/profile/UpdatePasswordForm';
import React from 'react';
import { Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import routeList from 'utils/routeList';
import useSetTitle from 'hook/setTitle';

const UpdatePassword = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  useSetTitle('Update Password');
  if (!isAuthenticated) {
    return <Navigate to='/' />;
  }

  return (
    <>
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
