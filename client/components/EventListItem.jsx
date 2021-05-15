import React from 'react';
import { ListItem, Typography, Button, makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
    display: 'flex',
    justifyContent: 'space-between',
  },
}));
const EventListItem = (props) => {
  const event = props.event || {};
  let voted;
  if (event.votes) {
    event.votes.forEach((vote) => {
      if (vote.voterId === props.user.user.id) voted = true;
    });
  }
  console.log('from event list', props);
  const classes = useStyles();
  return (
    <ListItem button className={classes.nested}>
      <Typography>
        {event.name} {event.location} votes = {('', event.votes.length)}
      </Typography>
      {voted ? (
        <Button
          color="primary"
          variant="outlined"
          onClick={() => props.removeVote(event.id, event.tripId)}
        >
          Remove Vote
        </Button>
      ) : (
        <Button
          color="primary"
          variant="contained"
          onClick={() => props.handleVotes(event.id, event.tripId)}
        >
          Vote
        </Button>
      )}
    </ListItem>
  );
};

export default connect((state) => state)(EventListItem);
