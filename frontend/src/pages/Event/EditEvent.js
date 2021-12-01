import React, { useEffect } from 'react';
import { Row, Col, Button } from 'antd';
import EventForm from 'components/event/EventForm';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { findPostForEdit } from 'store/action/event.action';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import routeList from 'utils/routeList';
import useSetTitle from 'hook/setTitle';

const EditEvent = ({ findPostForEdit }) => {
  const { id } = useParams();
  useEffect(() => findPostForEdit(id), [id, findPostForEdit]);
  useSetTitle('Edit Event');
  const { isAuthenticated } = useSelector((state) => state.auth);
  if (!isAuthenticated) {
    return <Navigate to='/' />;
  }

  return (
    <>
      <Row justify='space-between'>
        <Col>
          <h2>Edit Event</h2>
        </Col>
        <Col>
          <Button type='primary'>
            <Link to={routeList.event.view}>View Events</Link>
          </Button>
        </Col>
      </Row>
      <EventForm isEdit id={id} />
    </>
  );
};

export default connect(null, { findPostForEdit })(EditEvent);
