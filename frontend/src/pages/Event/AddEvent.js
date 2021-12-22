import EventForm from 'components/event/EventForm';
import React from 'react';

import { Button, Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import routeList from 'utils/routeList';
import { useSetTitle } from 'hook/setTitle';
const AddEvent = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  useSetTitle('Add Event');
  if (!isAuthenticated) {
    return <Navigate to='/' />;
  }
  return (
    <>
      <Row justify='space-between'>
        <Col>
          <h2>Add Events</h2>
        </Col>
        <Col>
          <Button type='primary'>
            <Link to={routeList.event.view}>View Events</Link>
          </Button>
        </Col>
      </Row>
      <EventForm />
    </>
  );
};

export default AddEvent;
