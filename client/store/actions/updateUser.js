import axios from 'axios';

export const UPDATE_USER = 'UPDATE_USER';

const _updateUser = (user) => {
  return {
    type: UPDATE_USER,
    user,
  };
};

export default (userId) => (dispatch) => {
  try {
    const response = await axios.put(`/api/user/${userId}`);
    const updatedUser = response.data;
    dispatch(_updateUser(updatedUser));
  } catch (error) {
    console.log(error);
  }
};
