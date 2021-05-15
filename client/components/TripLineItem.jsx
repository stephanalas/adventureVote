import React from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import deleteTrip from '../store/actions/deleteTrip';
export default connect(
  (state) => state,
  (dispatch) => {
    return {
      deleteTrip: (userId, tripId) => dispatch(deleteTrip(userId, tripId)),
    };
  }
)((props) => {
  const trip = props.trip || {};
  // let users = props.users || [];
  let user;
  if (props.user) {
    user = props.user.user;
  } else {
    user = {};
  }
  console.log(trip, 'from trip line item');
  return (
    <ListItem key={trip.id}>
      <ListItemAvatar>
        <Avatar alt={`Avatar n°${1}`} src={trip.photo} />
      </ListItemAvatar>
      <ListItemText primary={trip.name} />
      <ListItemText secondary={trip.location} />
      <Button onClick={() => props.history.push(`/updateTrip/trip/${trip.id}`)}>
        Edit Trip
      </Button>
      {trip.creatorId === user.id ? (
        <Button onClick={() => props.deleteTrip(props.user.user.id, trip.id)}>
          Delete Trip
        </Button>
      ) : null}
      s{' '}
    </ListItem>
  );
});
