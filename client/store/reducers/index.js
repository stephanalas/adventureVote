import { combineReducers } from 'redux';
import user from './user';
import users from './users';
import trips from './trips';
import notifications from './notifications';
export default combineReducers({
  user,
  users,
  trips,
  notifications,
});
