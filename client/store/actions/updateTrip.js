import axios from 'axios';

const UPDATE_TRIP = 'UPDATE_TRIP';

export const _updateTrip = (trip, user) => {
  return {
    type: UPDATE_TRIP,
    trip,
    user,
  };
};

export default (userId, tripId, tripInfo, attendees = []) =>
  async (dispatch) => {
    try {
      const response = await axios.put(
        `/api/users/${userId}/trips/${tripId}`,
        tripInfo
      );
      if (attendees.length) {
        attendees.forEach(async (attendee) => {
          const response = await axios.get(
            `/api/users/${attendee.id}/trips/${tripId}`
          );
          if (!response.data.id) {
            await axios.post(
              `/api/users/${userId}/trips/${tripId}/friends/${attendee.id}`
            );
          }
        });
      }

      const updatedTrip = response.data;
      const userResponse = await axios.get(`/api/user/${userId}`);
      dispatch(updatdTrip, userResponse.data);
    } catch (error) {
      console.log(error);
    }
  };
