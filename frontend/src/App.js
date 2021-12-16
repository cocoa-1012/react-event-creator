import React, { useEffect } from 'react';
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
import axios from 'axios';
import { getToken } from 'utils/token';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { logout } from 'store/action/auth.action';

axios.defaults.headers.common['Authorization'] = getToken();

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const checkIfTokenExpired = useCallback(async () => {
    try {
      if (isAuthenticated) {
        const { data } = await axios.get('/api/auth/validate');
        if (data.expired) {
          message.error('Your session is expired! Redirecting', 2);
          setTimeout(() => {
            dispatch(logout());
          }, 3000);
        }
      }
    } catch (error) {
      message.error('Internal Server Error!', 1);
    }
  }, [isAuthenticated, dispatch]);

  useEffect(() => checkIfTokenExpired(), [checkIfTokenExpired]);

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
