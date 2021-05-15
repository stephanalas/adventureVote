import { CREATE_EVENT } from '../actions/createEvent';
import { CREATE_TRIP } from '../actions/createTrip';
import { DELETE_TRIP } from '../actions/deleteTrip';
import { GET_TRIPS } from '../actions/getTrips';
import { UPDATE_TRIP } from '../actions/updateTrip';
export default (state = [], action) => {
  if (
    action.type === CREATE_TRIP ||
    action.type === GET_TRIPS ||
    action.type === DELETE_TRIP
  ) {
    return action.trips;
  }
  if (action.type === DELETE_TRIP) {
    state = state.filter((trip) => trip.id !== action.tripId);
  }
  if (action.type === UPDATE_TRIP || action.type === CREATE_EVENT) {
    state = state
      .filter((trip) => trip.id !== action.trip.id)
      .concat(action.trip);
  }

  return state;
};
