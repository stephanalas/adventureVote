import axios from 'axios';
import getToken from '../../utils/getToken';

export const CREATE_EVENT = 'CREATE_EVENT';

const _createEvent = (user, trip) => {
  return {
    type: CREATE_EVENT,
    user,
    trip,
  };
};

export default (userId, eventInfo, tripId) => async (dispatch) => {
  try {
    console.log('in createEvent thunk here is tripId', tripId);
    const response = await axios.post(
      `/api/users/${userId}/trips/${tripId}/events`,
      eventInfo
    );
    const event = response.data;
    // get updated trip with potential attendees
    const updatedTrip = await axios.get(
      `/api/trips/${event.tripId}`,
      getToken()
    );
    let authenticatedUser = await axios.get('/api/login/auth', getToken());
    if (authenticatedUser.data === 'JsonWebTokenError') {
      throw 'User not logged in';
    }

    delete authenticatedUser.data.password;
    dispatch(_createEvent(authenticatedUser.data, updatedTrip.data));
  } catch (error) {
    console.log('error in evenet');
    console.log(error);
  }
};
