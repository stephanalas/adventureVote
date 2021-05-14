import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Divider, Typography } from '@material-ui/core';
import { connect, useDispatch } from 'react-redux';
import HomeTabs from './HomeTabs';
import getTrips from '../store/actions/getTrips';
import TripSection from './TripSection';
import getNotifications from '../store/actions/getNotifications';
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
  const redirectCreateTrip = () => {
    props.history.push('/createTrip');
  };
  const handleFriendsClick = () => {
    props.history.push('/friends');
  };
  let trips;
  if (props.user.user) trips = props.user.user.trips;
  else trips = [];
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
          <TripSection trips={trips} sectionName={'My Trips'} />
          <TripSection trips={trips} sectionName={'Invited Trips'} />
          <TripSection trips={trips} sectionName={'Past Trips'} />
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
