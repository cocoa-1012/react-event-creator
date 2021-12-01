import UserInfo from 'components/profile/UserInfo';
import React from 'react';

import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  if (!isAuthenticated) {
    return <Navigate to='/' />;
  }

  return (
    <>
      <h2>User Information</h2>
      <UserInfo />
    </>
  );
};

export default Profile;
