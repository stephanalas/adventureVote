import axios from 'axios';

export const DELETE_TRIP = 'DELETE_TRIP';

const _deleteTrip = (tripId) => {
  return {
    type: DELETE_TRIP,
    tripId,
  };
};

export default (userId, tripId) => async (dispatch) => {
  try {
    await axios.delete(`/api/users/${userId}/trips/${tripId}`);
    dispatch(_deleteTrip(tripId));
  } catch (error) {
    console.log(error);
    console.log('error in delete trip thunk');
  }
};
