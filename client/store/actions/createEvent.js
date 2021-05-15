import axios from 'axios';
import getToken from '../../utils/getToken';

export const CREATE_EVENT = 'CREATE_EVENT';

const _createEvent = (user, trips) => {
  return {
    type: CREATE_EVENT,
    user,
    trips,
  };
};

export default (userId, eventInfo, tripId) => async (dispatch) => {
  try {
    const response = await axios.post(
      `/api/users/${userId}/trips/${tripId}/events`,
      eventInfo
    );
    const event = response.data;
    // get updated trip with potential attendees
    const updatedTrips = await axios.get(
      `/api/users/${userId}/trips`,
      getToken()
    );
    let authenticatedUser = await axios.get('/api/login/auth', getToken());
    if (authenticatedUser.data === 'JsonWebTokenError') {
      throw 'User not logged in';
    }

    delete authenticatedUser.data.password;
    dispatch(_createEvent(authenticatedUser.data, updatedTrips.data));
  } catch (error) {
    console.log('error in evenet');
    console.log(error);
  }
};
