import axios from 'axios';
import getToken from '../../utils/getToken';

export const DELETE_TRIP = 'DELETE_TRIP';

const _deleteTrip = (trips, user) => {
  return {
    type: DELETE_TRIP,
    trips,
    user,
  };
};

export default (userId, tripId) => async (dispatch) => {
  try {
    await axios.delete(`/api/users/${userId}/trips/${tripId}`);
    const tripResponse = await axios.get(
      `/api/users/${userId}/trips`,
      getToken()
    );
    const userResponse = await axios.get(`/api/users/${userId}`, getToken());
    dispatch(_deleteTrip(tripResponse.data, userResponse.data));
  } catch (error) {
    console.log(error);
    console.log('error in delete trip thunk');
  }
};
