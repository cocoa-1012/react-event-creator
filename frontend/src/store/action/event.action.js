import * as types from './actionTypes';
import axios from 'axios';
import { getToken } from 'utils/token';
import shortid from 'shortid';
import { message } from 'antd';

axios.defaults.headers.common['Authorization'] = getToken();

export const eventAdd = (values, cb) => async (dispatch) => {
  try {
    const res = await axios.post('/api/event', values);
    const event = res.data;

    dispatch({
      type: types.ADD_EVENT,
      payload: {
        event,
      },
    });
    cb(true, event.id);
  } catch (e) {
    dispatch({
      type: types.SET_EVENT_ERROR,
      payload: {
        errors: e?.response?.data,
        errorType: 'add',
      },
    });
    cb(false);
  }
};

export const fetchAllEvents = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/event');

    dispatch({
      type: types.SET_ALL_EVENTS,
      payload: {
        events: res.data,
      },
    });
  } catch (e) {
    dispatch({
      type: types.SET_EVENT_ERROR,
      payload: {
        errors: e?.response?.data,
        errorType: 'all',
      },
    });
  }
};

export const findPostForEdit = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/event/${id}`);
    const event = res.data;
    dispatch({
      type: types.SET_EVENT_FOR_EDIT,
      payload: {
        event,
      },
    });
  } catch (e) {
    dispatch({
      type: types.SET_EVENT_ERROR,
      payload: {
        errors: e?.response?.data,
        errorType: 'edit',
      },
    });
  }
};

export const eventUpdate = (values, id, cb) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/event/${id}`, values);
    const event = res.data;

    dispatch({
      type: types.UPDATE_EVENT,
      payload: {
        event,
      },
    });
    cb(true);
  } catch (e) {
    dispatch({
      type: types.SET_EVENT_ERROR,
      payload: {
        errors: e?.response?.data,
        errorType: 'e',
      },
    });
    cb(false);
  }
};

export const deleteEvent = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/event/${id}`);

    dispatch({
      type: types.DELETE_EVENT,
      payload: {
        id,
      },
    });
  } catch (e) {
    dispatch({
      type: types.SET_EVENT_ERROR,
      payload: {
        errors: e?.response?.data,
        errorType: 'e',
      },
    });
  }
};

export const fetchEventImages = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/event/${id}/image`);

    dispatch({
      type: types.FETCH_EVENT_IMAGES,
      payload: { images: data },
    });
  } catch (e) {
    dispatch({
      type: types.SET_EVENT_ERROR,
      payload: {
        errors: e?.response?.data,
        errorType: 'e',
      },
    });
  }
};

export const eventImageUpload =
  ({ id, url, formData }) =>
  async (dispatch) => {
    try {
      const tempId = shortid();
      const TempData = {
        id: tempId,
        url,
        isUploading: true,
      };
      dispatch({
        type: types.EVENT_IMAGE_UPLOAD,
        payload: { image: TempData },
      });

      const { data } = await axios.post(`/api/event/${id}/image`, formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });

      message.success('Image uploaded successfully');

      dispatch({
        type: types.EVENT_IMAGE_UPLOAD_UPDATE,
        payload: { image: data, tempId },
      });
    } catch (e) {
      dispatch({
        type: types.SET_EVENT_ERROR,
        payload: {
          errors: e?.response?.data,
          errorType: 'e',
        },
      });
    }
  };

export const eventImageDelete =
  ({ id }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: types.EVENT_IMAGE_DELETE_STATUS,
        payload: { id },
      });

      const { data } = await axios.delete(`/api/event/image/${id}`);
      message.success(data.message);

      dispatch({
        type: types.EVENT_IMAGE_DELETE,
        payload: { id },
      });
    } catch (e) {
      message.error('Image delete failed!');
      dispatch({
        type: types.SET_EVENT_ERROR,
        payload: {
          errors: e?.response?.data,
          errorType: 'upload',
        },
      });
    }
  };
