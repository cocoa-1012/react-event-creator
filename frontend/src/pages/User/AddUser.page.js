import { Button, Col, Row } from 'antd';
import UserForm from 'components/user/UserForm';
import React from 'react';
import { Link } from 'react-router-dom';

import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import routeList from 'utils/routeList';

const AddUser = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  if (!isAuthenticated) {
    return <Navigate to='/' />;
  }
  if (!user.isAdmin) {
    return <Navigate to='/event/view' />;
  }
  return (
    <>
      <Row justify='space-between'>
        <Col>
          <h2>Add User</h2>
        </Col>
        <Col>
          <Button type='primary'>
            <Link to={routeList.user.view}>View User</Link>
          </Button>
        </Col>
      </Row>
      <UserForm />
    </>
  );
};

export default AddUser;
