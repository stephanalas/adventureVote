import axios from 'axios';

export const CREATE_TRIP = 'CREATE_TRIP';

const _createTrip = (trips) => {
  return {
    type: CREATE_TRIP,
    trips,
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
      const updatedTrips = await axios.get(`/api/users/${userId}/trips`);
      dispatch(_createTrip(updatedTrips.data));
    } catch (error) {
      console.log('error in createTrip');
      console.log(error);
    }
  };
