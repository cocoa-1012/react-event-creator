import * as types from './actionTypes';
import axios from 'axios';
import { getToken } from 'utils/token';

axios.defaults.headers.common['Authorization'] = getToken();

export const addUser = (values, cb) => async (dispatch) => {
  try {
    const res = await axios.post('/api/user', values);
    const user = res.data;
    dispatch({
      type: types.ADD_USER,
      payload: {
        user,
      },
    });

    cb(true);
  } catch (e) {
    dispatch({
      type: types.SET_USER_ERROR,
      payload: {
        errors: e?.response?.data,
        type: 'add',
      },
    });
    cb(false);
  }
};

export const getAllUser = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/user');
    const users = res.data;
    dispatch({
      type: types.SET_ALL_USERS,
      payload: {
        users,
      },
    });
  } catch (e) {
    dispatch({
      type: types.SET_USER_ERROR,
      payload: {
        errors: e?.response?.data,
        type: 'all',
      },
    });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/user/${id}`);

    dispatch({
      type: types.DELETE_USER,
      payload: { id },
    });
  } catch (e) {
    dispatch({
      type: types.SET_USER_ERROR,
      payload: {
        errors: e?.response?.data,
        type: 'delete',
      },
    });
  }
};
