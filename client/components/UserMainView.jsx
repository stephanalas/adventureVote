import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Grid,
  Divider,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import getUser from '../store/actions/getUser';
import CreateNewTripCard from './CreateNewTripCard';
import HomeTabs from './HomeTabs';
import TripCard from './TripCard';
import getTrips from '../store/actions/getTrips';
const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
  },
  paper: {
    backgroundColor: 'green',
    height: '100%',
    marginTop: '3rem',
    marginLeft: '1rem',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  },
  userNavigation: {
    width: '20%',
  },
  lineContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  option: {
    backgroundColor: 'white',
    height: '4rem',
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    margin: '0',
  },
  button: {
    width: '100%',
    height: '100%',
  },
  typography: {
    width: '100%',
    height: '100%',
  },
});
export default connect(
  (state) => state,
  (dispatch) => {
    return {
      getTrips: (userId) => dispatch(getTrips(userId)),
    };
  }
)((props) => {
  const classes = useStyles();
  const trips = props.trips || [];
  const redirectCreateTrip = () => {
    props.history.push('/createTrip');
  };
  const handleFriendsClick = () => {
    props.history.push('/friends');
  };
  if (localStorage.getItem('token') && !props.trips.length) {
    props.getTrips(props.user.id);
  }
  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12} sm={3} className={classes.userNavigation}>
        <HomeTabs
          redirectCreateTrip={redirectCreateTrip}
          handleFriendsClick={handleFriendsClick}
        />
      </Grid>
      <Grid item xs={12} sm={2} className={classes.lineContainer}>
        <Divider orientation="vertical" />
      </Grid>
      <Grid item xs={12} sm={6}>
        {/* flexbox the paper element */}
        <Paper className={classes.paper}>
          <Typography>Current Trips</Typography>
          {trips.length ? (
            trips.map((trip) => <TripCard key={trip.id} trip={trip} />)
          ) : (
            <CreateNewTripCard redirectCreateTrip={redirectCreateTrip} />
          )}
        </Paper>
      </Grid>
    </Grid>
  );
});
