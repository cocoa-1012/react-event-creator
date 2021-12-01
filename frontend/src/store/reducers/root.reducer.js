import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import eventReducer from './event.reducer';
import userReducer from './user.reduce';

const rootReducer = combineReducers({
  auth: authReducer,
  event: eventReducer,
  user: userReducer,
});

export default rootReducer;
