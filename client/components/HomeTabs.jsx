import React from 'react';
import { Paper, Grid, Typography, Button, makeStyles } from '@material-ui/core';
const useStyles = makeStyles(() => ({
  paper: {
    backgroundColor: 'green',
    height: '100%',
    marginTop: '3rem',
    marginLeft: '1rem',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  },
  typography: {
    width: '100%',
    height: '100%',
  },
  button: {
    width: '100%',
    height: '100%',
  },
  option: {
    backgroundColor: 'white',
    height: '4rem',
    margin: '0',
  },
}));
export default (props) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Grid item className={classes.option}>
        <Typography className={classes.typography}>
          <Button onClick={props.redirectCreateTrip} className={classes.button}>
            Create A Trip
          </Button>
        </Typography>
      </Grid>
      <Grid item className={classes.option}>
        <Typography className={classes.typography}>
          <Button className={classes.button} onClick={props.handleFriendsClick}>
            My friends
          </Button>
        </Typography>
      </Grid>
      <Grid item className={classes.option}>
        <Typography className={classes.typography}>
          <Button className={classes.button}>Past Trips</Button>
        </Typography>
      </Grid>
      <Grid item className={classes.option}>
        <Typography className={classes.typography}>
          <Button className={classes.button}>Notifications</Button>
        </Typography>
      </Grid>
      <Grid item className={classes.option}>
        <Typography className={classes.typography}>
          <Button className={classes.button}>Events</Button>
        </Typography>
      </Grid>
      <Grid item className={classes.option}>
        <Typography className={classes.typography}>
          <Button className={classes.button}>Settings</Button>
        </Typography>
      </Grid>
    </Paper>
  );
};
