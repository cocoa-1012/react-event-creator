import * as types from '../action/actionTypes';
const init = {
  user: {},
  me: {},
  errors: {},
  errorType: '',
};

const authReducer = (state = init, action) => {
  switch (action.type) {
    case types.SET_USER: {
      const { user } = action.payload;

      return {
        ...state,
        user,
        errors: {},
        errorType: '',
      };
    }
    case types.SET_AUTH_ERROR: {
      const { errors, type } = action.payload;
      return {
        ...state,
        errorType: type,
        errors,
      };
    }
    case types.SET_AUTH_ME: {
      const { me } = action.payload;

      return {
        ...state,
        me,
      };
    }
    case types.SET_AUTH_USER_NAME: {
      const { name } = action.payload;

      return {
        ...state,
        me: {
          ...state.me,
          name,
        },
      };
    }

    default:
      return state;
  }
};

export default authReducer;
