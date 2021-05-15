import axios from 'axios';
import getToken from '../../utils/getToken';

export const REMOVE_VOTE = 'REMOVE_VOTE';

const _removeVote = (trip, user) => {
  return {
    type: REMOVE_VOTE,
    trip,
    user,
  };
};

export default (userId, eventId, tripId) => async (dispatch) => {
  try {
    const updatedTripWithEvents = await axios.delete(
      `/api/users/${userId}/trips/${tripId}/events/${eventId}/vote`
    );
    if (updatedTripWithEvents.error) {
      console.log('somethings wrong');
    } else {
      const response = await axios.get(`/api/users/${userId}`, getToken());
      dispatch(_removeVote(updatedTripWithEvents.data, response.data));
    }
  } catch (error) {
    console.log(error);
  }
};
