import axios from 'axios';
import getToken from '../../utils/getToken';
export const GET_USERS = 'GET_USERS';

export const _getUsers = (users) => {
  return {
    type: GET_USERS,
    users,
  };
};

export default () => async (dispatch) => {
  try {
    const response = await axios.get('/api/users', getToken());
    const users = response.data;
    dispatch(_getUsers(users));
  } catch (error) {
    console.log('error in getUser thunk');
    console.log(error);
  }
};
