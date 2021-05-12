import axios from 'axios';
import getToken from '../../utils/getToken';
export const LOGIN = 'LOGIN';

export const _login = (user) => {
  return {
    type: LOGIN,
    user,
  };
};

export default (userInfo) => async (dispatch) => {
  try {
    const response = await axios.post('/api/login/auth', userInfo);
    const { token, error } = response.data;
    let authenticatedUser;
    if (error) {
      // dispatch(_getLoginError(error));
      console.log('there was an issue');
    } else if (token) {
      window.localStorage.setItem('token', token);
      authenticatedUser = await axios.get('/api/login/auth', getToken());
    }
    delete authenticatedUser.data.password;
    dispatch(_login(authenticatedUser.data));
  } catch (error) {
    console.log('login thunk error');
    console.log(error);
  }
};
