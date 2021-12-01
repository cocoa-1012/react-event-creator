import React from 'react';
import EventTable from 'components/event/EventTable';
import { Button, Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import routeList from 'utils/routeList';
const ViewEvent = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  if (!isAuthenticated) {
    return <Navigate to='/' />;
  }

  return (
    <>
      <Row justify='space-between'>
        <Col>
          <h2>View Events</h2>
        </Col>
        <Col>
          <Button type='primary'>
            <Link to={routeList.event.add}>Add Event</Link>
          </Button>
        </Col>
      </Row>
      <EventTable />
    </>
  );
};

export default ViewEvent;
