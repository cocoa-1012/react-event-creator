import * as types from './actionTypes';
import axios from 'axios';
import { storeToken, getTokenData, removeToken } from 'utils/token';
import { message } from 'antd';
import routeList from 'utils/routeList';
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

export const loginAction =
  ({ username, password }) =>
  async (dispatch) => {
    try {
      const res = await axios.post('/auth/login', { username, password });
      const { token } = res.data;
      storeToken(token);
      const user = getTokenData();
      dispatch({
        type: types.SET_USER,
        payload: { user },
      });
      window.location.href = routeList.event.view;
    } catch (e) {
      dispatch({
        type: types.SET_AUTH_ERROR,
        payload: {
          type: 'login',
          errors: e?.response?.data,
        },
      });
    }
  };

axios.defaults.headers.common['Authorization'] = getTokenData();
export const findMe = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/auth/me');
    dispatch({
      type: types.SET_AUTH_ME,
      payload: {
        me: data,
      },
    });
  } catch (e) {
    dispatch({
      type: types.SET_AUTH_ERROR,
      payload: {
        type: 'me',
        errors: e?.response?.data,
      },
    });
  }
};

export const updateUserFullName = (name) => async (dispatch) => {
  try {
    const { data } = await axios.post('/auth/me/name', { name });

    dispatch({
      type: types.SET_AUTH_USER_NAME,
      payload: { name },
    });
    message.success({
      content: data.message,
      style: {
        marginTop: '10vh',
      },
    });
  } catch (e) {
    message.error({
      content: 'Error try again!',
      style: {
        marginTop: '10vh',
      },
    });
  }
};

export const updatePassword = (values, cb) => async (dispatch) => {
  try {
    const { data } = await axios.put('/auth/me/password', values);

    message.success({
      content: data.message,
      style: {
        marginTop: '10vh',
      },
    });

    cb(true);
  } catch (e) {
    dispatch({
      type: types.SET_AUTH_ERROR,
      payload: {
        type: 'password',
        errors: e?.response?.data,
      },
    });

    cb(false);
  }
};

export const logout = () => (dispatch) => {
  removeToken();
  dispatch({
    type: types.SET_USER,
    payload: { user: {} },
  });
  return true;
};
