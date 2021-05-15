import { Button, Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import TimePickers from './TimePickers';
import { connect } from 'react-redux';
import { TextField } from '@material-ui/core';
import FriendListModal from './FriendListModal';
import Attendees from './Attendees';

import createEvent from '../store/actions/createEvent';
const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '100%',
    margin: '5px',
  },
}));
const CreateEvent = (props) => {
  const classes = useStyles();
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [eventName, setEventName] = useState('');
  const [location, setLocation] = useState('');
  const eventNameInput = (ev) => {
    setEventName(ev.target.value);
  };
  const locationInput = (ev) => {
    setLocation(ev.target.value);
  };
  const handleClick = () => {
    const newDate = new Date();
    const month = newDate.getMonth() + 1;
    const day = newDate.getDate();
    const year = newDate.getFullYear();
    const formatDate = month + '/' + day + '/' + year;
    const payload = {
      name: eventName,
      location,
      departureDate,
      returnDate,
      startTime,
      endTime,
    };
    if (!departureDate.length) {
      payload['departureDate'] = formatDate;
    } else if (!returnDate.length) {
      payload['returnDate'] = formatDate;
    } else if (!departureDate.length && !returnDate.length) {
      payload['departureDate'] = formatDate;
      payload['returnDate'] = formatDate;
    }
    props.createEvent(props.user.user.id, payload, props.trip.id);
    // props.history.push('/home');
    props.setOpen(false);
    window.location.reload(false);
  };
  return (
    <Grid className={classes.root}>
      <TextField
        id="event-name-input"
        label="Event Name"
        placeholder="Music festival"
        variant="filled"
        onChange={eventNameInput}
        required
      />
      <TextField
        id="location-input"
        label="Location"
        placeholder="i.e. downtown"
        variant="filled"
        onChange={locationInput}
        required
      />
      <TimePickers
        setReturnDate={setReturnDate}
        setDepartureDate={setDepartureDate}
        departureDate={departureDate}
        returnDate={returnDate}
        event={true}
        setStartTime={setStartTime}
        setEndTime={setEndTime}
        startTime={startTime}
        endTime={endTime}
      />
      <Button onClick={handleClick}>Create Event</Button>
    </Grid>
  );
};

export default connect(
  (state) => state,
  (dispatch) => {
    return {
      createEvent: (userId, eventInfo, tripId) =>
        dispatch(createEvent(userId, eventInfo, tripId)),
    };
  }
)(CreateEvent);
