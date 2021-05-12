export const CREATE_USER = 'CREATE_USER';
import axios from 'axios';
import getToken from '../../utils/getToken';
export const _createUser = (user) => {
  return {
    type: CREATE_USER,
    user,
  };
};

export default (userInfo) => async (dispatch) => {
  try {
    console.log(userInfo);
    const response = await axios.post('/api/users', userInfo);
    const { token } = response.data;
    window.localStorage.setItem('token', token);
    const authenticatedUser = await axios.get('/api/login/auth', getToken());
    delete authenticatedUser.data.password;
    dispatch(_createUser(authenticatedUser.data));
  } catch (error) {
    console.log('createUser thunk error');
    console.log(error);
  }
};
