import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Divider, Typography } from '@material-ui/core';
import { connect, useDispatch } from 'react-redux';
import HomeTabs from './HomeTabs';
import getTrips from '../store/actions/getTrips';
import TripSection from './TripSection';
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
    zIndex: '-4',
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
  const dispatch = useDispatch();
  const classes = useStyles();
  const redirectCreateTrip = () => {
    props.history.push('/createTrip');
  };
  const handleFriendsClick = () => {
    props.history.push('/friends');
  };
  // if (props.user.id && !props.trips.length) {
  //   props.getTrips(props.user.id);
  // }
  const trips = props.user.trips || [];
  const userTrips = trips.filter((trip) => trip.creatorId === props.user.id);
  const invitedTrips = trips.filter((trip) => trip.creatorId !== props.user.id);
  const now = new Date().getMonth();
  const pastTrips = trips.filter((trip) =>
    parseInt(trip.returnDate.slice(0, 2) < now)
  );

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
          <Typography>Trips</Typography>
          <TripSection trips={userTrips} sectionName={'My Trips'} />
          <TripSection trips={invitedTrips} sectionName={'Invited Trips'} />
          <TripSection trips={pastTrips} sectionName={'Past Trips'} />
          {/* {trips.length ? (
            trips.map((trip) => <TripCard key={trip.id} trip={trip} />)
          ) : (
            <CreateNewTripCard redirectCreateTrip={redirectCreateTrip} />
          )} */}
        </Paper>
      </Grid>
    </Grid>
  );
});