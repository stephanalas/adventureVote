import { CREATE_USER } from '../actions/createUser';
import { LOGIN } from '../actions/login';
import { LOGOUT } from '../actions/logout';
export default (state = {}, action) => {
  if (action.type === CREATE_USER || action.type === LOGIN) {
    return action.user;
  }
  if (action.type === LOGOUT) {
    return {};
  }
  return state;
};
