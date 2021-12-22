import React, { useEffect } from 'react';
import EventImageUpload from 'components/event/EventImageUpload';
import { useParams } from 'react-router';
import { Link, Navigate } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { Button, Col, Row } from 'antd';
import routeList from 'utils/routeList';

const Images = ({ events }) => {
  const { id } = useParams();
  const { isAuthenticated } = useSelector((state) => state.auth);
  useEffect(() => {
    const event = events.find((ev) => ev.id === parseInt(id));
    document.title = `Images | ${event?.name}`;
  }, [id, events]);
  if (!isAuthenticated) {
    return <Navigate to='/' />;
  }
  return (
    <>
      <h2>Image upload</h2>
      <EventImageUpload id={id} />
      <Row>
        <Col>
          <Button type='primary' style={{ marginTop: 10 }}>
            <Link to={routeList.event.add}>Done Image upload</Link>
          </Button>
        </Col>
      </Row>
    </>
  );
};

const mapState = (state) => ({
  events: state.event.events,
});

export default connect(mapState)(Images);
