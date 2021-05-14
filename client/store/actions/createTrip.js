import axios from 'axios';
import getToken from '../../utils/getToken';

export const CREATE_TRIP = 'CREATE_TRIP';

const _createTrip = (trips, user) => {
  return {
    type: CREATE_TRIP,
    trips,
    user,
  };
};

export default (userId, tripInfo, attendees = []) =>
  async (dispatch) => {
    try {
      const response = await axios.post(`/api/users/${userId}/trips`, tripInfo);
      const trip = response.data;
      // establish invite
      if (attendees.length) {
        attendees.forEach(async (attendee) => {
          await axios.post(
            `/api/users/${userId}/trips/${trip.id}/friends/${attendee.id}`
          );
        });
      }
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
      dispatch(_createTrip(updatedTrips.data, authenticatedUser.data));
    } catch (error) {
      console.log('error in createTrip');
      console.log(error);
    }
  };
