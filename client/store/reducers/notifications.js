import { GET_NOTIFICATIONS } from '../actions/getNotifications';

export default (state = [], action) => {
  if (action.type === GET_NOTIFICATIONS) {
    return action.notifications;
  }
  return state;
};
