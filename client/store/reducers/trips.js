import { CREATE_TRIP } from '../actions/createTrip';
import { GET_TRIPS } from '../actions/getTrips';

export default (state = [], action) => {
  if (action.type === CREATE_TRIP || action.type === GET_TRIPS) {
    return action.trips;
  }
  return state;
};
