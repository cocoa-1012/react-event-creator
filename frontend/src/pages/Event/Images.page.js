import React from 'react';
import EventImageUpload from 'components/event/EventImageUpload';
import { useParams } from 'react-router';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Images = () => {
  const { id } = useParams();
  const { isAuthenticated } = useSelector((state) => state.auth);
  if (!isAuthenticated) {
    return <Navigate to='/' />;
  }
  return (
    <>
      <h2>Image upload</h2>
      <EventImageUpload id={id} />
    </>
  );
};

export default Images;
