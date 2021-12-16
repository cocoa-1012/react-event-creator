import * as types from './actionTypes';
import axios from 'axios';
import { storeToken, getTokenData, removeToken, getToken } from 'utils/token';
import { message } from 'antd';
import routeList from 'utils/routeList';

export const loginAction =
  ({ username, password }) =>
  async (dispatch) => {
    try {
      const res = await axios.post('/api/auth/login', { username, password });
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

axios.defaults.headers.common['Authorization'] = getToken();
export const findMe = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/auth/me');
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
    const { data } = await axios.post('/api/auth/me/name', { name });

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

export const updatePassword =
  (values, queryMessage, cb) => async (dispatch) => {
    try {
      const { data } = await axios.put('/api/auth/me/password', values);

      message.success({
        content: data.message,
        style: {
          marginTop: '10vh',
        },
      });

      if (queryMessage) {
        dispatch({
          type: types.SET_AUTH_USER_IS_PASS_RESET,
          payload: {
            isPassReset: true,
          },
        });
      }

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
