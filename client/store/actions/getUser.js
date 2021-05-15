import axios from 'axios';
import getToken from '../../utils/getToken';
export const GET_USER = 'GET_USER';

export const _getUser = (user) => ({
  type: GET_USER,
  user,
});

// thunk
export default () => async (dispatch) => {
  try {
    let authenticatedUser = await axios.get('/api/login/auth', getToken());
    if (authenticatedUser.data === 'JsonWebTokenError') {
      throw 'User not logged in';
    } else {
      delete authenticatedUser.data.password;
      dispatch(_getUser(authenticatedUser.data));
    }
  } catch (err) {
    console.log(err);
  }
};
