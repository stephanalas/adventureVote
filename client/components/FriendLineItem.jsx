import React, { useState } from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

export default (props) => {
  const [checkbox, setCheckbox] = useState(false);
  const onToggle = (ev) => {
    if (checkbox) {
      setCheckbox(false);
      props.setAttendees({
        ...props.attendees,
        [props.friend.username]: false,
      });
    } else {
      setCheckbox(true);
      props.setAttendees({ ...props.attendees, [props.friend.username]: true });
    }
  };
  return (
    <ListItem key={props.friend.id}>
      <ListItemAvatar>
        <Avatar alt={`Avatar n°${1}`} src={`/static/images/avatar/${1}.jpg`} />
      </ListItemAvatar>
      <ListItemText primary={props.friend.username} />
      <ListItemSecondaryAction>
        <Checkbox
          edge="end"
          onChange={onToggle}
          // inputProps={{ 'aria-labelledby': props.friend.id }}
          color="primary"
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
};
