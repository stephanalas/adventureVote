import { combineReducers } from 'redux';
import user from './user';
import users from './users';
import trips from './trips';
export default combineReducers({
  user,
  users,
  trips,
});
