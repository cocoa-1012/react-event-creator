import * as types from '../action/actionTypes';

const init = {
  events: [],
  errors: {},
  errorType: '',
  event: {},
  images: [],
};

const eventReducer = (state = init, action) => {
  switch (action.type) {
    case types.ADD_EVENT: {
      const { event } = action.payload;
      return {
        ...state,
        events: [...state.events, event],
        errorType: '',
        errors: {},
      };
    }
    case types.SET_EVENT_ERROR: {
      const { errors, errorType } = action.payload;
      return {
        ...state,
        errorType,
        errors,
      };
    }
    case types.SET_ALL_EVENTS: {
      const { events } = action.payload;
      return {
        ...state,
        events,
        errorType: '',
        errors: {},
      };
    }
    case types.SET_EVENT_FOR_EDIT: {
      const { event } = action.payload;
      return {
        ...state,
        event,
      };
    }
    case types.UPDATE_EVENT: {
      const { event } = action.payload;
      const events = state.events.map((item) => {
        if (item.id === event.id) return event;
        return item;
      });
      return {
        ...state,
        event: {},
        events,
      };
    }
    case types.DELETE_EVENT: {
      const { id } = action.payload;
      const events = state.events.filter((item) => item.id !== id);
      return {
        ...state,
        events,
      };
    }
    case types.FETCH_EVENT_IMAGES: {
      const { images } = action.payload;

      return {
        ...state,
        images,
      };
    }
    case types.EVENT_IMAGE_UPLOAD: {
      const { image } = action.payload;
      const images = [...state.images, image];
      return {
        ...state,
        images,
      };
    }
    case types.EVENT_IMAGE_UPLOAD_UPDATE: {
      const { image, tempId } = action.payload;

      const images = state.images.map((item) => {
        if (item.id === tempId) {
          return image;
        }
        return item;
      });
      return {
        ...state,
        images,
      };
    }
    case types.EVENT_IMAGE_DELETE_STATUS: {
      const { id } = action.payload;

      const images = state.images.map((item) => {
        if (item.id === id) {
          item.isUploading = true;
          return item;
        }
        return item;
      });
      return {
        ...state,
        images,
      };
    }
    case types.EVENT_IMAGE_DELETE: {
      const { id } = action.payload;

      const images = state.images.filter((item) => item.id !== id);
      return {
        ...state,
        images,
      };
    }
    default:
      return state;
  }
};

export default eventReducer;
