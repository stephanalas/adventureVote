import axios from 'axios';
import getToken from '../../utils/getToken';

export const GET_TRIPS = 'GET_TRIPS';

const getTrips = (trips) => {
  return {
    type: GET_TRIPS,
    trips,
  };
};
export default (userId) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/users/${userId}/trips`, getToken());
    dispatch(getTrips(response.data));
  } catch (error) {
    console.log('error in getTrips thunk');
    console.log(error);
  }
};
