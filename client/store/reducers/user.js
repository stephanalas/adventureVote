import { CREATE_USER } from '../actions/createUser';
import { GET_USER } from '../actions/getUser';
import { LOGIN } from '../actions/login';
import { LOGOUT } from '../actions/logout';
import { ADD_FRIEND } from '../actions/addFriend';
export default (state = {}, action) => {
  if (
    action.type === CREATE_USER ||
    action.type === LOGIN ||
    action.type === GET_USER ||
    action.type === ADD_FRIEND
  ) {
    return action.user;
  }
  if (action.type === LOGOUT) {
    return {};
  }
  return state;
};
