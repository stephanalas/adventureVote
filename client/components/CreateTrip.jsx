import { Button, Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import TimePickers from './TimePickers';
import { connect } from 'react-redux';
import { TextField } from '@material-ui/core';
import FriendListModal from './FriendListModal';
import Attendees from './Attendees';
import createTrip from '../store/actions/createTrip';
const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '100%',
    margin: '5px',
  },
}));
const CreateTrip = (props) => {
  const classes = useStyles();
  const [selectedAttendees, setSelectedAttendees] = useState([]);
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [tripName, setTripName] = useState('');
  const [location, setLocation] = useState('');
  const tripNameInput = (ev) => {
    setTripName(ev.target.value);
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
      name: tripName,
      location,
      departureDate,
      returnDate,
    };
    if (!departureDate.length) {
      payload['departureDate'] = formatDate;
    } else if (!returnDate.length) {
      payload['returnDate'] = formatDate;
    } else if (!departureDate.length && !returnDate.length) {
      payload['departureDate'] = formatDate;
      payload['returnDate'] = formatDate;
    }
    props.createTrip(props.user.user.id, payload, selectedAttendees);
    props.history.push('/home');
  };
  useEffect(() => console.log(departureDate));
  return (
    <Grid className={classes.root}>
      <TextField
        id="trip-name-input"
        label="Trip Name"
        placeholder="vacation"
        variant="filled"
        onChange={tripNameInput}
        required
      />
      <TextField
        id="location-input"
        label="Location"
        placeholder="i.e. Hawaii"
        variant="filled"
        onChange={locationInput}
        required
      />
      <TimePickers
        setReturnDate={setReturnDate}
        setDepartureDate={setDepartureDate}
        departureDate={departureDate}
        returnDate={returnDate}
      />
      <FriendListModal
        selectedAttendees={selectedAttendees}
        setSelectedAttendees={setSelectedAttendees}
      />
      <Attendees attendees={selectedAttendees} />
      <Button onClick={handleClick}>Create Trip</Button>
    </Grid>
  );
};

export default connect(
  (state) => state,
  (dispatch) => {
    return {
      createTrip: (userId, tripInfo, attendees) =>
        dispatch(createTrip(userId, tripInfo, attendees)),
    };
  }
)(CreateTrip);
