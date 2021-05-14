import axios from 'axios';

export const GET_NOTIFICATIONS = 'GET_NOTIFICATIONS';
const _getNotifcations = (notifications) => {
  return {
    type: GET_NOTIFICATIONS,
    notifications,
  };
};

export default (userId) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/users/${userId}/notifications`);
    const notifications = response.data;
    dispatch(_getNotifcations(notifications));
  } catch (error) {
    console.log('error in getNotifications thunk', error);
  }
};
