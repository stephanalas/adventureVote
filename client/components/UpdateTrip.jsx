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
  const handleClick = (userId, tripId) => {
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
    props.updateTrip(userId, tripId, payload, selectedAttendees);
    // props.history.push('/home');
  };
  let user;
  let newTrip;
  if (props.user.user) {
    user = props.user.user;
    newTrip = user.trips.find(
      (trip) => trip.id === props.match.params.tripId * 1
    );
  } else {
    user = {};
  }
  let name;
  if (newTrip) {
    name = newTrip.name;
    console.log(newTrip.id, 'if statement in UpdateTrip for events');
    return (
      <Grid className={classes.root}>
        <Typography>Update Trip</Typography>
        <Typography>{name}</Typography>
        <TextField
          id="trip-name-input"
          label="New Trip Name"
          placeholder="vacation"
          variant="filled"
          onChange={tripNameInput}
          disabled={newTrip.creatorId !== user.id}
        />
        <TextField
          id="location-input"
          label="Location Name"
          placeholder="i.e. Hawaii"
          variant="filled"
          onChange={locationInput}
          disabled={newTrip.creatorId !== user.id}
        />
        <TimePickers
          setReturnDate={setReturnDate}
          setDepartureDate={setDepartureDate}
          departureDate={departureDate}
          returnDate={returnDate}
          trip={newTrip}
          userId={user.id}
          // user={user}
        />
        <FriendListModal
          selectedAttendees={selectedAttendees}
          setSelectedAttendees={setSelectedAttendees}
        />
        <CreateEventModal trip={newTrip} />
        <EventList trip={newTrip} />
        <Attendees attendees={selectedAttendees} update={true} />
        <Button onClick={() => handleClick(user.id, newTrip.id)}>
          Update Trip
        </Button>
      </Grid>
    );
  } else {
    name = '';
    console.log(trip.id, 'else statement in UpdateTrip for events');
    return (
      <Grid className={classes.root}>
        <Typography>Update Trip</Typography>
        <Typography>{name}</Typography>
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
          newUser={user}
        />
        <FriendListModal
          selectedAttendees={selectedAttendees}
          setSelectedAttendees={setSelectedAttendees}
        />
        <CreateEventModal trip={trip} />
        <EventList trip={trip} />
        <Attendees attendees={selectedAttendees} update={true} />
        <Button onClick={() => handleClick(user.id, trip.id)}>
          Update Trip
        </Button>
      </Grid>
    );
  }
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
