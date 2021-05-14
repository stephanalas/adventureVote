import React, { useEffect, useState } from 'react';
import {
  GridListTile,
  GridListTileBar,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import StarBorderIcon from '@material-ui/icons/StarBorder';
const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  container: {
    height: '100%',
    width: '100%',
  },
  photo: {
    width: '25rem',
    height: '15rem',
  },
}));
const TripTile = (props) => {
  const classes = useStyles();
  const trip = props.trip || {};
  console.log(trip);
  return (
    <GridListTile className={classes.container}>
      <img src={trip.photo} alt={trip.photo} className={classes.photo} />
      <GridListTileBar
        title={trip.name}
        classes={{
          root: classes.titleBar,
          title: classes.title,
        }}
        actionIcon={
          <IconButton aria-label={`star ${trip.name}`}>
            <StarBorderIcon className={classes.title} />
          </IconButton>
        }
      />
    </GridListTile>
  );
};

export default TripTile;
