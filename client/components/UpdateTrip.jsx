import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import TimePickers from './TimePickers';
import { connect } from 'react-redux';
import { TextField } from '@material-ui/core';
import FriendListModal from './FriendListModal';
import Attendees from './Attendees';
import updateTrip from '../store/actions/updateTrip';
import EventList from './EventList';
import axios from 'axios';
import CreateEventModal from './CreateEventModal';
const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '100%',
    margin: '5px',
  },
}));
const UpdateTrip = (props) => {
  const [trip, setTrip] = useState({});
  const classes = useStyles();
  const [selectedAttendees, setSelectedAttendees] = useState([]);
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [tripName, setTripName] = useState('');
  const [location, setLocation] = useState('');
  useEffect(() => {
    if (!trip.id) {
      getTrip(props.match.params.tripId);
    }
  }, []);
  const getTrip = async (id) => {
    try {
      const response = await axios.get(`/api/trips/${id}}`);

      setTrip(response.data);
      // setSelectedAttendees(response.data.Attendees);
    } catch (error) {
      console.log(error);
    }
  };
  // if (!props.trip) await axios.get('/api/trips/${props.match.params.tripId');
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
    if (!departureDate) {
      payload['departureDate'] = formatDate;
    } else if (!returnDate.length) {
      payload['returnDate'] = formatDate;
    } else if (!departureDate.length && !returnDate.length) {
      payload['departureDate'] = formatDate;
      payload['returnDate'] = formatDate;
    }
    props.updateTrip(props.user.user.id, trip.id, payload, selectedAttendees);
    // props.history.push('/home');
  };
  let user;
  let newTrip;
  if (props.user.user) {
    user = props.user.user;
    newTrip = user.trips.find(
      (trip) => trip.id === props.match.params.tripId * 1
    );
    console.log('near new trip line 76', newTrip);
  } else {
    user = {};
    // newTrip = {};
  }
  const labelname = newTrip || {};

  return (
    <Grid className={classes.root}>
      <Typography>Update Trip</Typography>
      <Typography>{labelname[0]}</Typography>
      <TextField
        id="trip-name-input"
        label="New Trip Name"
        placeholder="vacation"
        variant="filled"
        onChange={tripNameInput}
        disabled={trip.creatorId !== user.id}
      />
      <TextField
        id="location-input"
        label="Location Name"
        placeholder="i.e. Hawaii"
        variant="filled"
        onChange={locationInput}
        disabled={trip.creatorId !== user.id}
      />
      <TimePickers
        setReturnDate={setReturnDate}
        setDepartureDate={setDepartureDate}
        departureDate={departureDate}
        returnDate={returnDate}
        trip={trip}
      />
      <FriendListModal
        selectedAttendees={selectedAttendees}
        setSelectedAttendees={setSelectedAttendees}
      />
      <CreateEventModal trip={trip} />
      <EventList trip={newTrip} />
      <Attendees attendees={selectedAttendees} update={true} />
      <Button onClick={handleClick}>Update Trip</Button>
    </Grid>
  );
};

export default connect(
  (state) => state,
  (dispatch) => {
    return {
      updateTrip: (userId, tripInfo, attendees) =>
        dispatch(updateTrip(userId, tripInfo, attendees)),
    };
  }
)(UpdateTrip);
