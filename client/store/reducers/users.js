import { GET_USERS } from '../actions/getUsers';

export default (state = [], action) => {
  if (action.type === GET_USERS) {
    return action.users;
  }
  return state;
};
