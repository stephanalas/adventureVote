import axios from 'axios';

export const ADD_FRIEND = 'ADD_FRIEND';

export const _addFriend = (user) => {
  return {
    type: ADD_FRIEND,
    user,
  };
};

export default (userId, friendId) => async (dispatch) => {
  try {
    const response = await axios.post(
      `/api/users/${userId}/friends/${friendId}`
    );
    const updatedUser = response.data;
    dispatch(_addFriend(updatedUser));
  } catch (error) {
    console.log('error in add friend thunk');
    console.log(error);
  }
};
