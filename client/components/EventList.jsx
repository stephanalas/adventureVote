import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { connect } from 'react-redux';
import addVote from '../store/actions/addVote';
import EventListItem from './EventListItem';
import removeVote from '../store/actions/removeVote';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '50%',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

export default connect(
  (state) => state,
  (dispatch) => {
    return {
      addVote: (userId, eventId, tripId) =>
        dispatch(addVote(userId, eventId, tripId)),
      removeVote: (userId, eventId, tripId) =>
        dispatch(removeVote(userId, eventId, tripId)),
    };
  }
)(function EventList(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleVotes = (eventId, tripId) => {
    props.addVote(props.user.user.id, eventId, tripId);
  };
  const removeVote = (eventId, tripId) => {
    props.removeVote(props.user.user.id, eventId, tripId);
  };
  let events;
  const trip = props.trip || {};
  if (trip.id) {
    events = props.trip.events;
  } else events = [];
  console.log(props);
  return (
    <List
      component="div"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListItem button onClick={handleClick}>
        <ListItemText primary="Trip Events" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {events.length
            ? events.map((event) => {
                return (
                  <EventListItem
                    event={event}
                    removeVote={removeVote}
                    handleVotes={handleVotes}
                  />
                );
              })
            : null}
        </List>
      </Collapse>
    </List>
  );
});
