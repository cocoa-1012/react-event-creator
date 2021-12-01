import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Login from './pages/Login.page';
import AddEvent from 'pages/Event/AddEvent';
import ViewEvent from 'pages/Event/ViewEvent';
import EditEvent from 'pages/Event/EditEvent';
import AddUser from 'pages/User/AddUser.page';
import ViewUsers from 'pages/User/ViewUsers.page';
import Profile from 'pages/Profile/Profile';
import UpdatePassword from 'pages/Profile/UpdatePassword';
import Images from 'pages/Event/Images.page';
import routeList from 'utils/routeList.js';
import Layout from 'components/layout/Layout';

const App = () => {
  return (
    <div>
      <Layout>
        <Routes>
          <Route path='/' element={<Login />} />

          <Route path={routeList.event.images} element={<Images />} />
          <Route path={routeList.event.add} element={<AddEvent />} />
          <Route path={routeList.event.view} element={<ViewEvent />} />
          <Route path={routeList.event.edit} element={<EditEvent />} />

          <Route path={routeList.user.view} element={<ViewUsers />} />
          <Route path={routeList.user.add} element={<AddUser />} />

          <Route
            path={routeList.profile.updatePassword}
            element={<UpdatePassword />}
          />
          <Route path={routeList.profile.view} element={<Profile />} />
        </Routes>
      </Layout>
    </div>
  );
};

export default App;
