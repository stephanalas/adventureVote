import React from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';

export default (props) => {
  const trip = props.trip || {};
  return (
    <ListItem key={trip.id}>
      <ListItemAvatar>
        <Avatar alt={`Avatar n°${1}`} src={trip.photo} />
      </ListItemAvatar>
      <ListItemText primary={trip.name} />
      <ListItemText secondary={trip.location} />
    </ListItem>
  );
};
