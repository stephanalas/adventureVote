import { Button, Grid, makeStyles } from '@material-ui/core';
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
  const [selectedAttendees, setSelectedAttendees] = useState(trip.Attendees);
  const [departureDate, setDepartureDate] = useState(trip.departureDate);
  const [returnDate, setReturnDate] = useState(trip.returnDate);
  const [tripName, setTripName] = useState(trip.name);
  const [location, setLocation] = useState(trip.location);
  useEffect(() => {
    if (!trip.id) {
      getTrip();
    }
  }, []);
  const getTrip = async () => {
    try {
      const response = await axios.get(
        `/api/trips/${props.match.params.tripId}`
      );

      setTrip(response.data);
      setSelectedAttendees(response.data.Attendees);
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
    if (!departureDate.length) {
      payload['departureDate'] = formatDate;
    } else if (!returnDate.length) {
      payload['returnDate'] = formatDate;
    } else if (!departureDate.length && !returnDate.length) {
      payload['departureDate'] = formatDate;
      payload['returnDate'] = formatDate;
    }
    props.updateTrip(props.user.user.id, payload, selectedAttendees);
    // props.history.push('/home');
  };
  console.log(selectedAttendees, 'From update trip component');
  return (
    <Grid className={classes.root}>
      <TextField
        id="trip-name-input"
        label={trip.name}
        placeholder="vacation"
        variant="filled"
        onChange={tripNameInput}
        required
      />
      <TextField
        id="location-input"
        label={trip.location}
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
      <CreateEventModal trip={trip} />
      <EventList trip={trip} />
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
