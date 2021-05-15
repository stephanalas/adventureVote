import React, { useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import TripLineItem from './TripLineItem';
import { makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import getTrips from '../store/actions/getTrips';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default connect(
  (state) => state,
  (dispatch) => {
    return {
      getTrips: (userId) => dispatch(getTrips(userId)),
    };
  }
)(function TripSection(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [t, setT] = useState([]);
  const sectionName = props.sectionName || '';
  const handleClick = () => {
    setOpen(!open);
  };
  if (!props.user.user) {
    // props.getTrips();
  }
  useEffect(() => {
    if (props.user.user) {
      setT(props.user.trips);
    }
  });

  let trips;
  if (props.user.user) {
    trips = props.user.user.trips;
  } else trips = [];
  if (props.sectionName === 'Past Trips') {
    const now = new Date().getMonth();
    trips = trips.filter((trip) => parseInt(trip.returnDate.slice(0, 2) < now));
  }
  if (props.sectionName === 'My Trips') {
    trips = trips.filter((trip) => trip.creatorId === props.user.user.id);
  }
  if (props.sectionName === 'Invited Trips') {
    trips = trips.filter((trip) => trip.creatorId !== props.user.user.id);
  }
  return (
    <List
      component="div"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListItem button onClick={handleClick}>
        <ListItemText primary={sectionName} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {trips.map((trip) => {
            return (
              <ListItem button className={classes.nested}>
                <TripLineItem history={props.history} trip={trip} />
              </ListItem>
            );
          })}
        </List>
      </Collapse>
    </List>
  );
});
