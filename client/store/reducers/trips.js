import { ADD_VOTE } from '../actions/addVote';
import { CREATE_EVENT } from '../actions/createEvent';
import { CREATE_TRIP } from '../actions/createTrip';
import { DELETE_TRIP } from '../actions/deleteTrip';
import { GET_TRIPS } from '../actions/getTrips';
import { REMOVE_VOTE } from '../actions/removeVote';
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
  if (
    action.type === ADD_VOTE ||
    action.type === UPDATE_TRIP ||
    action.type === CREATE_EVENT ||
    action.type === REMOVE_VOTE
  ) {
    state = state
      .filter((trip) => trip.id !== action.trip.id)
      .concat(action.trip);
  }

  return state;
};
