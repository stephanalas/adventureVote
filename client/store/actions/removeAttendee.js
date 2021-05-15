import axios from 'axios';

export const REMOVE_ATTENDEE = 'REMOVE_ATTENDEE';

const _removeAttendee = (trip, user) => {
  return {
    type: REMOVE_ATTENDEE,
    trip,
    user,
  };
};

export default async (userId, tripId, attendeeId) => (dispatch) => {
  try {
    await axios.delete(
      `/api/users/${userId}/trips/${tripId}/attendees/${attendeeId}`
    );
    const tripResponse = await axios.get(`/api/trips/${tripId}`);
    const trip = tripResponse.data;
    const { data } = await axios.get(`/api/users/${userId}`);
    const user = data;
    dispatch(_removeAttendee(trip, user));
  } catch (error) {
    console.log(error);
  }
};
