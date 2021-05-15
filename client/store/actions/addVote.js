import axios from 'axios';
import getToken from '../../utils/getToken';

export const ADD_VOTE = 'ADD_VOTE';

const _addVote = (trip, user) => {
  return {
    type: ADD_VOTE,
    trip,
    user,
  };
};

export default (userId, eventId, tripId) => async (dispatch) => {
  try {
    const updatedTripWithEvents = await axios.post(
      `/api/users/${userId}/trips/${tripId}/events/${eventId}`
    );
    if (updatedTripWithEvents.error) {
      console.log('youve already voted');
    } else {
      const response = await axios.get(`/api/users/${userId}`, getToken());
      dispatch(_addVote(updatedTripWithEvents.data, response.data));
    }
  } catch (error) {
    console.log(error);
  }
};
