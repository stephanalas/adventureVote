import { CREATE_TRIP } from '../actions/createTrip';
import { DELETE_TRIP } from '../actions/deleteTrip';
import { GET_TRIPS } from '../actions/getTrips';

export default (state = [], action) => {
  if (action.type === CREATE_TRIP || action.type === GET_TRIPS) {
    return action.trips;
  }
  if (action.type === DELETE_TRIP) {
    state = state.filter((trip) => trip.id !== action.tripId);
  }
  return state;
};
